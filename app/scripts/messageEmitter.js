/*global chrome */
var messageEmitter = (function() {
    function sendMessage(data) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data);
      });
    }

    return {
      sendMessageToCurrentTab: function(data) {
        sendMessage(data);
      },
      sendMove: function(direction) {
          var message = new emitterCommand('moveFocus').addParam('direction', direction);
          sendMessage(message);
      },
      sendNavigation: function(direction) {
        var message = new emitterCommand('browserNavigation').addParam('direction', direction);
        sendMessage(message);
      }
    }
})();
