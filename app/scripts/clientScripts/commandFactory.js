/*global chrome */
var commandFactory = (function() {

    return {
        getCommand: function(emitterCommand) {
            var commandName = emitterCommand.commandName.toLowerCase();
            switch(commandName){
                case "movefocus": {
                  return focusClientCommand;
                  break;
                }
                case "browsernavigation": {
                    return browserNavigationClientCommand;
                    break;
                }
                case "confirmselection": {
                    return selectClientCommand;
                    break;
                }
                case "togglefullscreen": {
                    return browserFullScreenClientCommand;
                    break;
                }
                default: {
                    throw new Error("Unsupported command " + commandName);
                }
            }
        }
    }
})();
