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

        var textNode = document.createTextNode('ctrl :' + response.controllerIndex + ', btn: ' + response.buttonIndex);
        var spanNode = document.createElement('span');

        spanNode.appendChild(textNode);
        div.querySelector('div').appendChild(spanNode);
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
      var actions = response[controller][button];

      actions.forEach(function(action) {
        var textNode = document.createTextNode('ctrl: ' + controller + ', btn: ' + button);
        var spanNode = document.createElement('span');

        spanNode.appendChild(textNode);
        document.getElementById(convertToId(action)).querySelector('div').appendChild(spanNode);
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
  
})();
