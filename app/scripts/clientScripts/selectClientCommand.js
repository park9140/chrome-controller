/*global chrome */
var selectClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            var playerId = emitterCommand.getParam("playerId");
            selectCurrentFocus(playerId);
        }
    }
})();
