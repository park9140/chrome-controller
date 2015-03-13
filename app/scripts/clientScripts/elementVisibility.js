var elementVisibility = (function() {

  var isElementVisible = function(element, elementRect) {
    var x = elementRect.left + 1;
    var y = elementRect.top + 1;
    var elementFound = document.elementFromPoint(x, y);
    return (elementFound !== null && element === elementFound);
  }

  return {
    isElementVisible: isElementVisible
  };
})();
