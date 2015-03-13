'use strict';

var getInputCallback;

function getPollFn(gamepadIndex) {
  var lastGamepad = {
    buttons: [],
    axes: []
  };
  var slowAxis = {};

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
          id: 'controller.buttonUnpressed',
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
      var lastAxis = lastGamepad.axes[i]
      var axisIndex = 'axis ' +  i;
      if (lastAxis > .2) {
        var axisData = {
          id: 'controller.buttonPressed',
          controllerIndex: gamepadIndex,
          actionId: axisIndex,
          value: axis
        }
        chrome.runtime.sendMessage(axisData);
      }
      if (axis !== 0 && Math.abs(axis) > .2) {
        console.log('controller axis ' + i + ' pressed with value ' + axis);

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
            id: 'controller.buttonUnpressed',
            controllerIndex: gamepadIndex,
            actionId: axisIndex + ' pos',
            value: Math.abs(axis)
          }
        } else if(lastAxis < -.5 && axis > -.5) {
          eventData = {
            id: 'controller.buttonUnpressed',
            controllerIndex: gamepadIndex,
            actionId: axisIndex + ' neg',
            value: Math.abs(axis)
          }
        }


        var axisData = {
          id: 'controller.buttonPressed',
          controllerIndex: gamepadIndex,
          actionId: axisIndex,
          value: axis
        }
        if(!slowAxis[i]) {
          chrome.runtime.sendMessage(axisData);
          slowAxis[i] = setTimeout(function() { slowAxis[i] = false; }, 400);
        }
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
