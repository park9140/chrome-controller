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
      sendMove: function(direction, playerId) {
          var message = new emitterCommand('moveFocus').addParam('direction', direction).addParam('playerId', playerId);
          sendMessage(message);
      },
      sendNavigation: function(direction) {
        var message = new emitterCommand('browserNavigation').addParam('direction', direction);
        sendMessage(message);
      },
      sendSelect: function(playerId) {
        var message = new emitterCommand('confirmSelection').addParam('playerId', playerId);
        sendMessage(message);
      },
      sendToggleFullScreen: function() {
        var message = new emitterCommand('togglefullscreen');
        sendMessage(message);
      }
    }
})();
