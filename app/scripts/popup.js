'use strict';

(function() {
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

  chromeControllerActions.forEach(function(key, i) {
    var div = document.getElementById(convertToId(key));

    div.querySelector('button').addEventListener('click', function() {
      var setBindingFn = function(response) {
        console.log('callback called');

        chrome.runtime.sendMessage({
          id: 'chromeController.setBinding',
          action: key,
          controller: response.controllerIndex,
          button: response.buttonIndex
        });
        div.querySelector('span').innerHTML = 'controller :' + response.controllerIndex + ', button: ' + response.buttonIndex;
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

      document.getElementById(convertToId(action)).querySelector('span').innerHTML = 'controller :' + controller + ', button: ' + button;
    });
  });
});

  document.getElementById('sendHelloButton')
          .addEventListener('click', function () {
            messageEmitter.sendMessageToCurrentTab("hello");
  });

  document.getElementById('navigateForward')
          .addEventListener('click', function () {
            messageEmitter.sendNavigation("forward");
  });

  document.getElementById('navigateBackward')
          .addEventListener('click', function () {
            messageEmitter.sendNavigation("backward");
  });
})();
