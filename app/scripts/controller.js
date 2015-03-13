'use strict';

var getInputCallback;

function getPollFn(gamepadIndex) {
  var lastGamepad = {
    buttons: [],
    axes: []
  };

  return function() {
    var gamepad = navigator.getGamepads()[gamepadIndex];


    gamepad.buttons.forEach(function(button, i) {
      var eventData;
      if (button.pressed && !lastGamepad.buttons[i]) {
        console.log('controller button ' + i + ' pressed with value ' + button.value);

        eventData = {
          id: 'controller.buttonPressed',
          controllerIndex: gamepadIndex,
          actionId: 'button ' + i,
          value: button.value
        };

        chrome.runtime.sendMessage(eventData);
      }
      if (!button.pressed && lastGamepad.buttons[i]) {
        console.log('controller button ' + i + ' unpressed pressed with value ' + button.value);

        eventData = {
          id: 'controller.buttonUnPressed',
          controllerIndex: gamepadIndex,
          actionId: 'button ' + i,
          value: button.value
        };

        chrome.runtime.sendMessage(eventData);
      }
      if (getInputCallback && eventData) {
        getInputCallback({buttonData:eventData});
        getInputCallback = undefined;
      }

      lastGamepad.buttons[i] = button.pressed;
    });

    var axisOffset = gamepad.buttons.length;
    gamepad.axes.forEach(function(axis, i) {
      if (axis !== 0 && Math.abs(axis) > .2) {
        var lastAxis = lastGamepad.axes[i]
        console.log('controller axis ' + i + ' pressed with value ' + axis);

        var axisIndex = 'axis ' +  i;
        var eventData;
        if(!(lastAxis > .5) && axis > .5) {
          eventData = {
            id: 'controller.buttonPressed',
            controllerIndex: gamepadIndex,
            actionId: axisIndex + ' pos',
            value: Math.abs(axis)
          }
        } else if(!(lastAxis < -.5) && axis < -.5) {
          eventData = {
            id: 'controller.buttonPressed',
            controllerIndex: gamepadIndex,
            actionId: axisIndex + ' neg',
            value: Math.abs(axis)
          }
        } else if(lastAxis > .5 && axis < .5) {
          eventData = {
            id: 'controller.buttonUnPressed',
            controllerIndex: gamepadIndex,
            actionId: axisIndex + ' pos',
            value: Math.abs(axis)
          }
        } else if(lastAxis < -.5 && axis > -.5) {
          eventData = {
            id: 'controller.buttonUnPressed',
            controllerIndex: gamepadIndex,
            actionId: axisIndex + ' neg',
            value: Math.abs(axis)
          }
        }


        var axisData = {
          id: 'controller.buttonPressed',
          controllerIndex: gamepadIndex,
          actionId: axisIndex,
          value: Math.abs(axis)
        }

        chrome.runtime.sendMessage(axisData);
        if(eventData) {
          chrome.runtime.sendMessage(eventData);
          if (getInputCallback) {
            getInputCallback({buttonData: eventData, axisData: axisData});
            getInputCallback = undefined;
          }
        }
      }
      lastGamepad.axes[i] = axis;
    })
  };
}

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('controller.js - chrome event recieved: ', e.id);

  switch(e.id) {
    case 'chromeController.getNextInput':
      getInputCallback = callback;
      return true;
    default:
  }
});

window.addEventListener('gamepadconnected', function(e) {
  console.log('gamepad connected');
  chrome.browserAction.setBadgeText({text: ''});
  setInterval(getPollFn(e.gamepad.index), 10);
});
