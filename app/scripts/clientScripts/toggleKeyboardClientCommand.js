/*global chrome */
var toggleKeyboardClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
          var state = emitterCommand.getParam("state");
          var playerId  = emitterCommand.getParam('playerId');

          keyboard.toggleKeyboard(state, playerId);
        }
    }
})();
