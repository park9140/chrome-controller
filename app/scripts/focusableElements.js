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
  console.log(focusableMap.length);
  return focusableMap;
}


function goDown() {
  var focusableMap = buildFocusablesMap();
  var currentFocusElement = document.activeElement;
  var currentFocusElementRect = currentFocusElement.getBoundingClientRect();

  focusableMap.forEach(function(key, value, map){

    console.log(key);
    console.log(value);
    console.log(map);
  });
}


window.addEventListener('load', function() {
  console.log(document.activeElement);
  goDown();
});
