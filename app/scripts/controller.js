function getPollFn(gamepadIndex) {
  var lastGamepad = {
    buttons: []
  };

  return function() {
    var gamepad = navigator.getGamepads()[gamepadIndex];

    for (var i = 0; i < gamepad.buttons.length; i++) {
      if (gamepad.buttons[i].pressed && lastGamepad.buttons[i] !== gamepad.buttons[i].value) {
        console.log('controller button ' + i + ' pressed with value ' + gamepad.buttons[i].value);

        var event = new CustomEvent('controller.buttonPressed', { detail: { controllerIndex: gamepadIndex, buttonIndex: i, value: gamepad.buttons[i].value } });
        window.dispatchEvent(event);
      }
      lastGamepad.buttons[i]= gamepad.buttons[i].value;
    }
  }
}

window.addEventListener('controller.buttonPressed', function(e) {
  console.log('button event handled: ', e.detail);
});

window.addEventListener('gamepadconnected', function(e) {
  console.log('gamepad connected');
  setInterval(getPollFn(e.gamepad.index), 100);
});
