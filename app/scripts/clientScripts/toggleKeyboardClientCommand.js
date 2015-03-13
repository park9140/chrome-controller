/*global chrome */
var toggleKeyboardClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
          var state = emitterCommand.getParam("state");

          keyboard.toggleKeyboard(state);
        }
    }
})();