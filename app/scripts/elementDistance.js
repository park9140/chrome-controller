
var elementDistance = (function() {

  var getPositionAtCenter = function (data) {
    return {
      x: data.left + data.width / 2,
      y: data.top + data.height / 2
    };
  };

  var getDistanceBetweenElements = function(a, b) {
    var aPosition = getPositionAtCenter(a);
    var bPosition = getPositionAtCenter(b);

    return Math.sqrt(
      Math.pow(aPosition.x - bPosition.x, 2) +
      Math.pow(aPosition.y - bPosition.y, 2)
    );
  };

 return {
   getPositionAtCenter: getPositionAtCenter,
   getDistanceBetweenElements: getDistanceBetweenElements
 };

})();
