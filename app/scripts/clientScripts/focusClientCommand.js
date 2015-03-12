/*global chrome */
var focusClientCommand = (function() {

  return {
    execute: function(emitterCommand) {
      var direction = emitterCommand.getParam("Direction").toLowerCase();
      console.log(direction);
      switch(direction){
        case "up": {
          moveToNextElement("up");
          break;
        }
        case "down" : {
          moveToNextElement("down");
          break;
        }
        case "left" : {
          moveToNextElement("left");
          break;
        }
        case "right" : {
          moveToNextElement("right");
          break;
        }
      }
    }
  }
})();
