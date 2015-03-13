var elementVisibility = (function() {

  var isElementVisible = function(element, elementRect) {
    var centerPosition = elementDistance.getPositionAtCenter(elementRect);
    var x = centerPosition.x;
    var y = centerPosition.y;
    var elementFound = document.elementFromPoint(x, y);
    return (elementFound !== null && element === elementFound);
  }

  return {
    isElementVisible: isElementVisible
  };
})();
