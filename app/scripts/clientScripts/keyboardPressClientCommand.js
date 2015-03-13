/*global chrome */
var keyboardPressClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            var direction = emitterCommand.getParam("direction");

            switch (direction) {
              case 'north':
                keyboard.sendKeypress(0);
                break;
              case 'east':
                keyboard.sendKeypress(1);
                break;
              case 'west':
                keyboard.sendKeypress(2);
                break;
              case 'south':
                keyboard.sendKeypress(3);
                break;
              default:
                break;
            }
        }
    }
})();
