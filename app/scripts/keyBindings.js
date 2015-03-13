'use strict';

var bindings = {};

chrome.storage.sync.get('bindings', function(response) {
  console.log('recieved bindings', response);
  bindings = response.bindings || {};
});

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('keyBindings.js - chrome event recieved: ', e.id);

  switch(e.id) {
    case 'chromeController.setBinding':
      bindings[e.controller] = bindings[e.controller] || {};
      bindings[e.controller][e.button] = bindings[e.controller][e.button] || [];
      bindings[e.controller][e.button].push(e.action);
      chrome.storage.sync.set({ bindings: bindings });
      break;
    case 'chromeController.getBindings':
      callback(bindings);
      break;
    case 'chromeController.clearBindings':
      chrome.storage.sync.set({ bindings: {} });
      bindings = {};
      break;
    case 'controller.buttonPressed':
      var actions = bindings[e.controllerIndex] && bindings[e.controllerIndex][e.buttonIndex];
      if (actions) {
        console.log('translating button event into extension event', e, actions);
        actions.forEach(function(action) {
          chrome.runtime.sendMessage({ id: 'chromeController.' + action });
        });
      }
      break;
    default:
  }
});
