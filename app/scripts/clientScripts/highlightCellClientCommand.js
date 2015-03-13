/*global chrome */
var highlightCellClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            var direction = emitterCommand.getParam("cellToHighlight");
            var playerId  = emitterCommand.getParam('playerId');

            keyboard.highlightCell(direction, playerId);
        }
    }
})();
