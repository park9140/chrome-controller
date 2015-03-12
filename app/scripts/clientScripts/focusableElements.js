'use strict';


function findFocusables() {
  var inputElementSelector = 'input:not(:disabled):not([readonly]):not([type=hidden]):not([type=checkbox])';
  return document.querySelectorAll(inputElementSelector
                                   + ',[tabindex]'
                                   + ',button:not([disabled])'
                                   + ',a[href]');
}

function buildFocusablesMap() {
  var focusableMap = new Map();
  var focusables = findFocusables();
  console.log(focusables);
  for (var i=0; i < focusables.length; i ++){
    var focusElement = focusables[i];
    var rect = focusElement.getBoundingClientRect();
    focusableMap.set(focusElement,rect);
  }
  return focusableMap;
}

function highlightElement(element) {
  if (element) {
    unHighlightPreviousElements();
    element.classList.add('controller-focus');
    element.focus();
  }
}

function unHighlightPreviousElements() {
  var highlightedElements = document.querySelectorAll('.controller-focus');
  for(var i=0; i < highlightedElements.length; i++) {
    highlightedElements[i].classList.remove('controller-focus');
  }
}

function moveToNextElement(direction) {
  console.log(direction +' called');
  var focusableMap = buildFocusablesMap();
  var currentFocusElement = document.activeElement;
  var currentFocusElementRect = currentFocusElement.getBoundingClientRect();

  var foundElement = null;
  var prevDistance = 999999999;
  var closestElement = null;
  focusableMap.forEach(function(elementRectangle, element, map){
    if (isThisElementLocatedInTheDirection(direction, elementRectangle, currentFocusElementRect)){
      var currentDistance = elementDistance.getDistanceBetweenElements(currentFocusElementRect, elementRectangle);
      if(currentDistance < prevDistance) {
        closestElement = element;
        prevDistance = currentDistance;
      }
    }
  });
  console.log(closestElement);
  highlightElement(closestElement);
}

function isThisElementLocatedInTheDirection(direction, elementRectangle, currentFocusElementRect){
  switch (direction) {
    case "up" :
      return elementRectangle.bottom < currentFocusElementRect.top;
      break;
    case "down":
      return (elementRectangle.top > currentFocusElementRect.bottom);
      break;
    case "left":
      return (elementRectangle.right < currentFocusElementRect.left);
      break;
    case "right":
      return (elementRectangle.left > currentFocusElementRect.right);
      break;
  }
}

function selectCurrentFocus() {
    var target = document.activeElement;
    target.click();
}
