'use strict';

console.log('\'Allo \'Allo! Popup');

var convertToId = function(str) {
  return str;
}

var chromeControllerActions = [
  'up', 'left', 'right', 'down',
  'forward', 'back',
  'next-tab', 'prev-tab',
  'confirm', 'cancel',
  'home'
];

$(document).ready(function() {
  chromeControllerActions.forEach(function(key, i) {
    var div = $('#' + convertToId(key));

    div.children('button').click(function() {
      var setBindingFn = function(response) {
        console.log('callback called');

        chrome.runtime.sendMessage({
          id: 'chromeController.setBinding',
          action: key,
          controller: response.controllerIndex,
          button: response.buttonIndex
        });
        div.children('span').html('controller :' + response.controllerIndex + ', button: ' + response.buttonIndex);
      };

      chrome.runtime.sendMessage({ id: 'chromeController.getNextButton' }, setBindingFn);
    });
  });

  chrome.runtime.sendMessage({ id: 'chromeController.getBindings' }, function(response) {
    console.log(response);

    var controllers = Object.keys(response);
    controllers.forEach(function(controller) {
      var buttons = Object.keys(response[controller]);
      buttons.forEach(function(button) {
        var action = response[controller][button];

        $('#' + convertToId(action)).children('span').html('controller :' + controller + ', button: ' + button);
      });
    });
  });
});

(function() {
  document.getElementById('sendHelloButton')
          .addEventListener('click', function () {
            messageEmitter.sendMessageToCurrentTab("hello");
  });

  document.getElementById('sendZoom')
    .addEventListener('click', function() {
      messageEmitter.sendZoom();
    });
})();
