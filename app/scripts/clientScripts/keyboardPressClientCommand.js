/*global chrome */
var keyboardPressClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            var direction = emitterCommand.getParam("direction");
            var playerId  = emitterCommand.getParam('playerId');
            switch (direction) {
              case 'north':
                keyboard.sendKeypress(0, playerId);
                break;
              case 'east':
                keyboard.sendKeypress(1, playerId);
                break;
              case 'west':
                keyboard.sendKeypress(2, playerId);
                break;
              case 'south':
                keyboard.sendKeypress(3, playerId);
                break;
              default:
                break;
            }
        }
    }
})();
