/*global chrome */
'use strict';

chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
  console.log(message);
  switch (message) {
    case 'up':
        moveToNextElement('up');
        break;
    case 'down':
        moveToNextElement('down');
        break;
    case 'left':
        moveToNextElement('left');
        break;
    case 'right':
        moveToNextElement('right');
        break;
  }
});
