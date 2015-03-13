/*global chrome */
var scrollClientCommand = (function() {
  var interval;
  var xVelocity = 0;
  var yVelocity = 0;
  return {
    execute: function(emitterCommand) {
      var direction = emitterCommand.getParam("direction").toLowerCase();
      var multiplier = emitterCommand.getParam("multiplier");
      console.log(direction);
      var scrollAmount = 10 * multiplier;

      if (!interval) {
        interval = setInterval(function() { window.scrollBy(xVelocity, yVelocity); }, 10)
      }

      switch(direction){
        case "vertical": {
          yVelocity = scrollAmount;
          break;
        }
        case "horizontal" : {
          xVelocity = scrollAmount;
          break;
        }
      }
      if(Math.abs(xVelocity) < 2.5 && Math.abs(yVelocity) < 2.5) {
        clearInterval(interval);
        interval = false;
      }
    }
  }
})();
