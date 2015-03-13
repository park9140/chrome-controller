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
      if (button.pressed && !lastGamepad.buttons[i]) {
        console.log('controller button ' + i + ' pressed with value ' + button.value);

        var eventData = {
          id: 'controller.buttonPressed',
          controllerIndex: gamepadIndex,
          buttonIndex: i,
          value: button.value
        };

        chrome.runtime.sendMessage(eventData);
        if (getInputCallback) {
          getInputCallback(eventData);
          getInputCallback = undefined;
        }
      } else if (!button.pressed && lastGamepad.buttons[i]) {
        chrome.runtime.sendMessage({
          id: 'controller.buttonUnpressed',
          controllerIndex: gamepadIndex,
          buttonIndex: i,
          value: button.value
        });
      }
      lastGamepad.buttons[i] = button.pressed;
    });

    var axisOffset = gamepad.buttons.length;
    gamepad.axes.forEach(function(axis, i) {
      if (axis !== 0 && Math.abs(axis) > .2) {
        console.log('controller axis ' + i + ' pressed with value ' + axis);

        var axisIndex = axisOffset + 2 * i;
        if (axis > 0) axisIndex++;

        var eventData = {
          id: 'controller.buttonPressed',
          controllerIndex: gamepadIndex,
          axisIndex: axisIndex,
          value: Math.abs(axis)
        }

        chrome.runtime.sendMessage(eventData);
        if (getInputCallback) {
          getInputCallback(eventData);
          getInputCallback = undefined;
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
