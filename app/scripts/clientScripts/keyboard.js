"use strict";
var keyboard = (function() {
  var input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', ',', '.', '!', '?', '\''];

  var keyboard =
  '<div id="chrome-controller-keyboard">' +
    '<div id="chrome-controller-keyboard-1"></div>' +
    '<div id="chrome-controller-keyboard-2"></div>' +
    '<div id="chrome-controller-keyboard-3"></div>' +
    '<div id="chrome-controller-keyboard-4"></div>' +
    '<div id="chrome-controller-keyboard-5"></div>' +
    '<div id="chrome-controller-keyboard-6"></div>' +
    '<div id="chrome-controller-keyboard-7"></div>' +
    '<div id="chrome-controller-keyboard-8"></div>' +
  '</div>';

  var currentlyHighlighedIndex = 4;

  var keyboardNode = document.createElement('div');
  keyboardNode.itemId = 'chrome-controller-keyboard';

  var cells = [];
  for (var i = 0; i < 9; i++) {
    cells[i] = document.createElement('div');
    cells[i].itemId = 'chrome-controller-keyboard=' + i;

    cells[i].style.setProperty('width', '80px');
    cells[i].style.setProperty('height', '80px');
    cells[i].style.setProperty('border', 'black 1px solid');
    cells[i].style.setProperty('border-radius', '30px');

    cells[i].style.setProperty('position', 'absolute');
    cells[i].style.setProperty('top', '' + (Math.floor(i / 3) - 1) * 90 + 'px');
    cells[i].style.setProperty('left', '' + (i % 3 - 1) * 90 + 'px');

    if (i != 4) {
      for (var j = 0; j < 4; j++) {
        var keyNode = document.createElement('span');
        var offset = i > 3 ? i - 1 : i;

        keyNode.innerHTML = input[offset * 4 + j];

        keyNode.style.setProperty('position', 'absolute');
        keyNode.style.setProperty('top', '' + Math.floor((j + 1) / 2) * 30 + 'px');
        keyNode.style.setProperty('left', '' + ((((j + 1) % 3) * 30) + 5) + 'px');

        cells[i].appendChild(keyNode);
      }
    } else {
      cells[i].hidden = true;
    }


    keyboardNode.appendChild(cells[i]);
  }

  keyboardNode.hidden = true;
  document.body.appendChild(keyboardNode);

  function toggleKeyboard() {
    keyboardNode.style.setProperty('position', 'absolute');

    var focusedRect = document.activeElement.getBoundingClientRect();

    keyboardNode.style.setProperty('top', '' + focusedRect.top + 'px');
    keyboardNode.style.setProperty('left', '' + focusedRect.left + 'px');
    keyboardNode.hidden = !keyboardNode.hidden;
  }

  function highlightCell(index) {
    console.log('highlighting cell', index);

    currentlyHighlighedIndex = index;

    for (var i = 0; i < 9; i++) {
      if (i == index) {
        cells[i].style.setProperty('background-color', '#DDD');
      } else {
        cells[i].style.removeProperty('background-color');
      }
    }
  }

  function sendKeypress(buttonOffset) {
    if (currentlyHighlighedIndex != 4) {
      var cellOffset = (currentlyHighlighedIndex > 3 ? currentlyHighlighedIndex - 1 : currentlyHighlighedIndex) * 4;
      var character = input[cellOffset + buttonOffset]

      console.log('adding character', character);

      document.activeElement.value = document.activeElement.value + character;
    }
  }

  return {
    toggleKeyboard: toggleKeyboard,
    highlightCell: highlightCell,
    sendKeypress: sendKeypress
  };
})();
