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
      sendZoom: function(direction) {
        var level = direction ? 10 : -10;
        var message = new emitterCommand('zoom').addParam('level', level);
        sendMessage(message);
      }
    }
})();
