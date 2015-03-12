/*global chrome */
var browserNavigationClientCommand = (function() {

    return {
        execute: function(emitterCommand) {
            var direction = emitterCommand.getParam("Direction").toLowerCase();
            switch(direction){
                case "forward": {
                    window.history.forward();
                    break;
                }
                case "backward": {
                    window.history.back();
                    break;
                }
                default: {
                    throw new Error("Unsupported navigation direction param value");
                }
            }
        }
    }
})();
