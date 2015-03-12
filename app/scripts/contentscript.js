/*global chrome */
'use strict';

chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
  console.log(message);
  switch (message) {
    case 'up':
        goUp();
        break;
    case 'down':
        goDown();
        break;
    case 'left':
        goLeft();
        break;
    case 'right':
        goRight();
        break;
  }
});
