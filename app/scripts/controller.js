'use strict';

var buttonPressCallback;

function getPollFn(gamepadIndex) {
  var lastGamepad = {
    buttons: []
  };

  return function() {
    var gamepad = navigator.getGamepads()[gamepadIndex];

    for (var i = 0; i < gamepad.buttons.length; i++) {
      if (gamepad.buttons[i].pressed && lastGamepad.buttons[i] !== gamepad.buttons[i].value) {
        console.log('controller button ' + i + ' pressed with value ' + gamepad.buttons[i].value);

        var eventData = {
          id: 'controller.buttonPressed',
          controllerIndex: gamepadIndex,
          buttonIndex: i,
          value: gamepad.buttons[i].value
        };

        window.dispatchEvent(new CustomEvent('controller.buttonPressed', { detail: eventData }));
        chrome.runtime.sendMessage(eventData);
        if (buttonPressCallback) {
          buttonPressCallback(eventData);
          buttonPressCallback = undefined;
        }
      }
      lastGamepad.buttons[i]= gamepad.buttons[i].value;
    }
  };
}

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('controller.js - chrome event recieved: ', e);

  switch(e.id) {
    case 'chromeController.getNextButton':
      buttonPressCallback = callback;
      return true;
    default:
  }
});

window.addEventListener('controller.buttonPressed', function(e) {
  console.log('button event handled: ', e.detail);
});

window.addEventListener('gamepadconnected', function(e) {
  console.log('gamepad connected');
  setInterval(getPollFn(e.gamepad.index), 100);
});
