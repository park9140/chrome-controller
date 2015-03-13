/*global chrome */
var focusClientCommand = (function() {

  return {
    execute: function(emitterCommand) {
      var direction = emitterCommand.getParam("Direction").toLowerCase();
      var playerId = emitterCommand.getParam("playerId");
      console.log(direction);
      switch(direction){
        case "up": {
          moveToNextElement("up", playerId);
          break;
        }
        case "down" : {
          moveToNextElement("down", playerId);
          break;
        }
        case "left" : {
          moveToNextElement("left", playerId);
          break;
        }
        case "right" : {
          moveToNextElement("right", playerId);
          break;
        }
      }
    }
  }
})();
