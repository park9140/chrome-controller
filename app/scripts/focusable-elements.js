'use strict';

var focusableMap = new Map();

function findFocusables() {
  return document.querySelectorAll('input:not(:disabled):not([readonly]):not([type=hidden]):not([type=checkbox])');
}

window.addEventListener('load', function() {
  console.log(document.activeElement);

  var focusables = findFocusables();

  console.log(focusables.length);

  for (var i=0; i < focusables.length; i ++){
    var focusElement = focusables[i];
    var rect = focusElement.getBoundingClientRect();
    focusableMap.set(focusElement,rect);
  }

});
