'use strict';
console.log('background script start load');

function getPollFn(gamepadIndex) {
  var lastGamepad = {
    buttons: []
  };

  return function() {
    var gamepad = navigator.getGamepads()[gamepadIndex];

    for (var i = 0; i < gamepad.buttons.length; i++) {
      if (gamepad.buttons[i].pressed && lastGamepad.buttons[i] !== gamepad.buttons[i].value) {
        console.log('controller button ' + i + ' pressed with value ' + gamepad.buttons[i].value);
      }
      lastGamepad.buttons[i]= gamepad.buttons[i].value;
    }
  };
}

var thinkers = [];

window.addEventListener('gamepadconnected', function(e) {
  console.log('gamepad connected');
  thinkers[e.gamepad.index] = setInterval(getPollFn(e.gamepad.index), 100);
});

window.addEventListener('gamepaddisconnected', function(e) {
  thinkers[e.gamepad.index]();
});
