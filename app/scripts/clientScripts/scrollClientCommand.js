/*global chrome */
var scrollClientCommand = (function() {

  return {
    execute: function(emitterCommand) {
      var direction = emitterCommand.getParam("Direction").toLowerCase();
      var multiplier = emitterCommand.getParam("Multiplier").toLowerCase();
      console.log(direction);
      var scrollAmount = 10 * multiplier;
      switch(direction){
        case "vertical": {
          window.scrollTo(window.scrollX, window.scrollY + scrollAmount);
          break;
        }
        case "horizontal" : {
          window.scrollTo(window.scrollX + scrollAmount, window.scrollY);
          break;
        }
      }
    }
  }
})();
