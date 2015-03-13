'use strict';

var cellToHighlight = {};

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('keyboard.js - chrome event recieved: ', e.id);

  switch(e.id) {
    case 'chromeController.toggle-keyboard':
    case 'chromeController.keyboard.toggle-keyboard':
      cellToHighlight[e.playerId] = 4;
      break;
    case 'chromeController.keyboard.up':
    case 'chromeController.keyboard.down.unpress':
      cellToHighlight[e.playerId] -= 3;
      messageEmitter.sendHighlightCell(cellToHighlight[e.playerId], e.playerId);
      break;
    case 'chromeController.keyboard.left':
    case 'chromeController.keyboard.right.unpress':
      cellToHighlight[e.playerId] -= 1;
      messageEmitter.sendHighlightCell(cellToHighlight[e.playerId], e.playerId);
      break;
    case 'chromeController.keyboard.right':
    case 'chromeController.keyboard.left.unpress':
      cellToHighlight[e.playerId] += 1;
      messageEmitter.sendHighlightCell(cellToHighlight[e.playerId], e.playerId);
      break;
    case 'chromeController.keyboard.down':
    case 'chromeController.keyboard.up.unpress':
      cellToHighlight[e.playerId] += 3;
      messageEmitter.sendHighlightCell(cellToHighlight[e.playerId], e.playerId);
      break;
    case 'chromeController.keyboard.north':
    case 'chromeController.keyboard.west':
    case 'chromeController.keyboard.east':
    case 'chromeController.keyboard.south':
      messageEmitter.sendKeyboardPress(e.id.split('.')[2], e.playerId);
      break;
    default:
      break;
  }
});
