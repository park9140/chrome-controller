'use strict';


function findFocusables() {
  var inputElementSelector = 'input:not(:disabled):not([readonly]):not([type=hidden]):not([type=checkbox])';
  return document.querySelectorAll(inputElementSelector
                                   + ',[tabindex]'
                                   + ',button:not([disabled])'
                                   + ',a[href]');
}

function isRectangleInSamePlaneAsFocusedRectangle(focusedRectangle, rectangle, direction) {
  var rectangleRight = rectangle.left + rectangle.width;
  var focusedRectangleRight = focusedRectangle.left + focusedRectangle.width;
  var rectangleBottom = rectangle.top + rectangle.height;
  var focusedRectangleBottom = focusedRectangle.top + focusedRectangle.height;
  switch (direction) {
    case "up":
    case "down":
      return (rectangleRight > focusedRectangle.left && rectangle.left < focusedRectangleRight);
      break;
    case "left":
    case "right":
      return (rectangleBottom > focusedRectangle.top && rectangle.top < focusedRectangleBottom)
      break;
  }
}

function buildFocusablesMap() {
  var focusableMap = new Map();
  var focusables = findFocusables();
  for (var i=0; i < focusables.length; i ++){
    var focusElement = focusables[i];
    var rect = focusElement.getBoundingClientRect();
    focusableMap.set(focusElement,rect);
  }
  return focusableMap;
}

function findCurrentFocusableElement(focusableMap) {
    var currentFocusedElement = document.activeElement;
    if (currentFocusedElement.tagName.toLowerCase() === "body") {
      for (var focusableElement of focusableMap.keys()) {
        currentFocusedElement = focusableElement;
        currentFocusedElement.focus();
        break;
      }
    }
    return currentFocusedElement;
}

function moveToNextElement(direction) {
  console.log(direction +' called');
  var focusableMap = buildFocusablesMap();
  var currentFocusElement = findCurrentFocusableElement(focusableMap);
  var currentFocusElementRect = currentFocusElement.getBoundingClientRect();

  var foundElement = null;
  var prevDistance = 999999999;
  var closestElement = null;
  focusableMap.forEach(function(elementRectangle, element, map){
    if (elementVisibility.isElementVisible(element, elementRectangle)
        && isThisElementLocatedInTheDirection(direction, elementRectangle, currentFocusElementRect)
        && isRectangleInSamePlaneAsFocusedRectangle(currentFocusElementRect, elementRectangle, direction)
        ){
      var currentDistance = elementDistance.getDistanceBetweenElements(currentFocusElementRect, elementRectangle);
      if(currentDistance < prevDistance) {
        closestElement = element;
        prevDistance = currentDistance;
      }
    }
  });

  if (closestElement) {
    closestElement.focus();
  }
}

function isThisElementLocatedInTheDirection(direction, elementRectangle, currentFocusElementRect){
  switch (direction) {
    case "up" :
      return elementRectangle.bottom <= currentFocusElementRect.top;
      break;
    case "down":
      return (elementRectangle.top >= currentFocusElementRect.bottom);
      break;
    case "left":
      return (elementRectangle.right <= currentFocusElementRect.left);
      break;
    case "right":
      return (elementRectangle.left >= currentFocusElementRect.right);
      break;
  }
}
window.addEventListener('load', function() {

  var focusElement = document.createElement('div');
  focusElement.classList.add('controller-focus');
  document.querySelector('body').appendChild(focusElement);
  setInterval(function() {
    var element = document.activeElement;
    var rect = element.getBoundingClientRect();
    focusElement.style.top = rect.top + 'px';
    focusElement.style.height = rect.height + 'px';
    focusElement.style.width = rect.width + 'px';
    focusElement.style.left = rect.left + 'px';
  }, 30);
})

function selectCurrentFocus() {
    var target = document.activeElement;
    target.click();
}
