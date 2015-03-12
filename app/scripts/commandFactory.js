/*global chrome */
var commandFactory = (function() {

    return {
        getCommand: function(emitterCommand) {
            var commandName = emitterCommand.commandName.toLowerCase();
            switch(commandName){
                case "move": {
                    throw new Error("Unsupported command");
                }
                case "browsernavigation": {
                    browserNavigationClientCommand.execute(emitterCommand);
                    break;
                }
                default: {
                    throw new Error("Unsupported command " + commandName);
                }
            }
        }
    }
})();
