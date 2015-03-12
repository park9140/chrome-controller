/*global chrome */
var messageEmitter = (function() {
    return {
      sendMessageToCurrentTab: function(data) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, data);
        });
      }
    }
})();
