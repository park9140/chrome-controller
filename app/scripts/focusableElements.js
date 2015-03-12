'use strict';


function findFocusables() {
  return document.querySelectorAll('input:not(:disabled):not([readonly]):not([type=hidden]):not([type=checkbox])');
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

function highlightElement(element) {
  if (element) {
    element.focus();
    element.style.borderWidth = "5px";
    element.style.borderStyle = "solid";
    element.style.borderColor = "red";
  }
}

function goUp() {
  console.log('goUp called');
  var focusableMap = buildFocusablesMap();
  var currentFocusElement = document.activeElement;
  var currentFocusElementRect = currentFocusElement.getBoundingClientRect();

  var foundElement = null;
  var prevDistance = 999999999;
  var closestElement = null;
  console.log(currentFocusElementRect);
  focusableMap.forEach(function(elementRectangle, element, map){
    if(elementRectangle.bottom < currentFocusElementRect.top) {
      var currentDistance = elementDistance.getDistanceBetweenElements(currentFocusElementRect, elementRectangle);
      console.log(currentDistance);
      if(currentDistance < prevDistance) {
        closestElement = element;
        prevDistance = currentDistance;
      }
    }
  });
  console.log(closestElement);
  highlightElement(closestElement);
}

function goDown() {
  console.log('goDown called');
  var focusableMap = buildFocusablesMap();
  var currentFocusElement = document.activeElement;
  var currentFocusElementRect = currentFocusElement.getBoundingClientRect();

  var foundElement = null;
  var prevDistance = 999999999;
  var closestElement = null;
  console.log(currentFocusElementRect);
  focusableMap.forEach(function(elementRectangle, element, map){
    if(elementRectangle.top > currentFocusElementRect.bottom) {
      var currentDistance = elementDistance.getDistanceBetweenElements(elementRectangle, currentFocusElementRect);
      console.log(currentDistance);
      if(currentDistance < prevDistance) {
        closestElement = element;
        prevDistance = currentDistance;
      }
    }
  });
  console.log(closestElement);
  highlightElement(closestElement);
}

function goRight() {
  console.log('goRight called');
  var focusableMap = buildFocusablesMap();
  var currentFocusElement = document.activeElement;
  var currentFocusElementRect = currentFocusElement.getBoundingClientRect();

  var foundElement = null;
  var prevDistance = 999999999;
  var closestElement = null;
  console.log(currentFocusElementRect);
  focusableMap.forEach(function(elementRectangle, element, map){
    if(elementRectangle.left > currentFocusElementRect.right) {
      var currentDistance = elementDistance.getDistanceBetweenElements(elementRectangle, currentFocusElementRect);
      console.log(currentDistance);
      if(currentDistance < prevDistance) {
        closestElement = element;
        prevDistance = currentDistance;
      }
    }
  });
  console.log(closestElement);
  highlightElement(closestElement);
}

function goLeft() {
  console.log('goLeft called');
  var focusableMap = buildFocusablesMap();
  var currentFocusElement = document.activeElement;
  var currentFocusElementRect = currentFocusElement.getBoundingClientRect();

  var foundElement = null;
  var prevDistance = 999999999;
  var closestElement = null;
  console.log(currentFocusElementRect);
  focusableMap.forEach(function(elementRectangle, element, map){
    if(elementRectangle.right < currentFocusElementRect.left) {
      var currentDistance = elementDistance.getDistanceBetweenElements(elementRectangle, currentFocusElementRect);
      console.log(currentDistance);
      if(currentDistance < prevDistance) {
        closestElement = element;
        prevDistance = currentDistance;
      }
    }
  });
  console.log(closestElement);
  highlightElement(closestElement);
}

window.addEventListener('load', function() {
});
