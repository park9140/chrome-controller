/*global chrome */
'use strict';

chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
  message = new emitterCommand(message.commandName, message.commandParameters);
  if(!message.commandName) {
    return;
  }
  commandFactory.getCommand(message).execute(message);
});
