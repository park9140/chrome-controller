/*global chrome */
'use strict';

chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
  console.log(message + ' ' + sender + ' ' + sendMessage);
});
