/*global chrome */
var highlightCellClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            var direction = emitterCommand.getParam("cellToHighlight");

            keyboard.highlightCell(direction);
        }
    }
})();
