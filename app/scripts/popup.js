'use strict';

(function() {
  var convertToId = function(str) {
    return str;
  }

  var chromeControllerActions = [
    'up', 'left', 'right', 'down',
    'forward', 'back', 'active-tab-reload',
    'next-tab', 'prev-tab',
    'confirm', 'cancel',
    'home', 'new-tab'
  ];

  var controllerAxisActions = [
    'scroll-vertical', 'scroll-horizontal'
  ];

  function addKeybind(key, controllerIndex, actionId) {
        var div = document.getElementById(convertToId(key));
        var textNode = document.createTextNode('ctrl :' + controllerIndex + ', btn: ' + actionId);
        var spanNode = document.createElement('span');

        spanNode.appendChild(textNode);
        spanNode.classList.add('keybind');
        spanNode.addEventListener('click', function() {
          chrome.runtime.sendMessage({ id: 'chromeController.clearBinding', action: key, controllerIndex: controllerIndex, actionId: actionId });
          div.querySelector('div').removeChild(spanNode);
        });
        div.querySelector('div').appendChild(spanNode);
  };

  function buildInterface(key, i, bindAxis) {
    var div = document.getElementById(convertToId(key));

    div.querySelector('button').addEventListener('click', function() {
      var setBindingFn = function(response, axisResponse) {
        console.log('callback called');
        if(bindAxis) {
          response = response.axisData;
        } else {
          response = response.buttonData;
        }

        chrome.runtime.sendMessage({
          id: 'chromeController.setBinding',
          action: key,
          controller: response.controllerIndex,
          button: response.actionId
        });
        addKeybind(key, response.controllerIndex, response.actionId);
      };

      chrome.runtime.sendMessage({ id: 'chromeController.getNextInput' }, setBindingFn);
    });
  }

  chromeControllerActions.forEach(function(key, i) {
    buildInterface(key, i);
  });

  controllerAxisActions.forEach(function(key, i) {
    buildInterface(key, i, true);
  });
chrome.runtime.sendMessage({ id: 'chromeController.getBindings' }, function(response) {
  console.log(response);

  var controllers = Object.keys(response);
  controllers.forEach(function(controller) {
    var buttons = Object.keys(response[controller]);
    buttons.forEach(function(button) {
      var actions = response[controller][button];

      actions.forEach(function(action) {
        addKeybind(action, controller, button);
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
      window.location.reload();
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
