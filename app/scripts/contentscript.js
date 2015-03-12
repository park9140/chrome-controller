/*global chrome */
'use strict';

chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
  console.log(message);
  switch (message) {
    case 'up':
        break;
    case 'down':
        goDown();
        break;
    case 'left':
        break;
    case 'right':
        break;
  }
});
