'use strict';

(function() {
  var chromeControllerActions = [
    'up', 'left', 'right', 'down',
    'forward', 'back', 'active-tab-reload',
    'next-tab', 'prev-tab',
    'confirm', 'cancel',
    'home',
    'toggle-keyboard',
    'keyboard-up', 'keyboard-left', 'keyboard-right', 'keyboard-down',
    'keyboard-north', 'keyboard-west', 'keyboard-east', 'keyboard-south'
  ];

  chromeControllerActions.forEach(function(key, i) {
    var div = document.getElementById(key);

    div.querySelector('button').addEventListener('click', function() {
      var setBindingFn = function(response) {
        console.log('callback called');

        chrome.runtime.sendMessage({
          id: 'chromeController.setBinding',
          action: key,
          controller: response.controllerIndex,
          button: response.buttonIndex
        });

        var textNode = document.createTextNode('ctrl :' + response.controllerIndex + ', btn: ' + response.buttonIndex);
        var spanNode = document.createElement('span');

        spanNode.appendChild(textNode);
        div.querySelector('div').appendChild(spanNode);
      };

      chrome.runtime.sendMessage({ id: 'chromeController.getNextInput' }, setBindingFn);
    });
  });

chrome.runtime.sendMessage({ id: 'chromeController.getBindings' }, function(response) {
  console.log(response);

  var controllers = Object.keys(response);
  controllers.forEach(function(controller) {
    var buttons = Object.keys(response[controller]);
    buttons.forEach(function(button) {
      var actions = response[controller][button];

      actions.forEach(function(action) {
        var textNode = document.createTextNode('ctrl: ' + controller + ', btn: ' + button);
        var spanNode = document.createElement('span');

        spanNode.appendChild(textNode);
        console.log(action);
        var elem = document.getElementById(action.replace('.', '-'));
        if (elem) {
          elem.querySelector('div').appendChild(spanNode);
        }
      });
    });
  });
});

  document.getElementById('sendHelloButton')
          .addEventListener('click', function () {
            messageEmitter.sendMessageToCurrentTab("hello");
  });

  document.getElementById('clearStorage')
    .addEventListener('click', function() {
      chrome.runtime.sendMessage({ id: 'chromeController.clearBindings' });
    });

  document.getElementById('navigateForward')
          .addEventListener('click', function () {
            messageEmitter.sendNavigation("forward");
  });

  document.getElementById('navigateBackward')
          .addEventListener('click', function () {
            messageEmitter.sendNavigation("backward");
  });

  document.getElementById('fullScreen')
    .addEventListener('click', function() {
      messageEmitter.sendToggleFullScreen();
    });

})();
