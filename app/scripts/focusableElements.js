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
  closestElement.focus();
  closestElement.style.borderWidth = "5px";
  closestElement.style.borderStyle = "solid";
  closestElement.style.borderColor = "red";
}


window.addEventListener('load', function() {
});
