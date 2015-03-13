/*global chrome */
var toggleKeyboardClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            keyboard.toggleKeyboard();
        }
    }
})();