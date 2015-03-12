/*global chrome */
var selectClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            selectCurrentFocus();
        }
    }
})();
