var elementVisibility = (function() {

  var isElementVisible = function(element, elementRect) {
    var x = elementRect.left;
    var y = elementRect.top;
    var elementFound = document.elementFromPoint(x, y);
    return (elementFound !== null && element === elementFound);
  }

  return {
    isElementVisible: isElementVisible
  };
})();
