/*global chrome */
'use strict';

chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
  message = new emitterCommand(message.commandName, message.commandParameters);
  commandFactory.getCommand(message).execute(message);
});
