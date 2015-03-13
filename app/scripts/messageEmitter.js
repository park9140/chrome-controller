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
      },
      sendSelect: function() {
        var message = new emitterCommand('confirmSelection');
        sendMessage(message);
      },
      sendToggleFullScreen: function() {
        var message = new emitterCommand('togglefullscreen');
        sendMessage(message);
      },
      sendToggleKeyboard: function(state) {
        var message = new emitterCommand('togglekeyboard').addParam('state', state);
        sendMessage(message);
      },
      sendHighlightCell: function(cellToHighlight) {
        var message = new emitterCommand('highlightcell').addParam('cellToHighlight', cellToHighlight);
        sendMessage(message);
      },
      sendKeyboardPress: function(direction) {
        var message = new emitterCommand('keypress').addParam('direction', direction);
        sendMessage(message);
      }
    }
})();
