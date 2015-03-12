'use strict';

var bindings = {};

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('keyBindings.js - chrome event recieved: ', e);

  switch(e.id) {
    case 'chromeController.setBinding':
      bindings[e.controller] = bindings[e.controller] || {};
      bindings[e.controller][e.button] = e.action;
      break;
    case 'chromeController.getBindings':
      callback(bindings);
      break;
    case 'controller.buttonPressed':
      var action = bindings[e.controllerIndex] && bindings[e.controllerIndex][e.buttonIndex];
      if (action) {
        console.log('translating button event into extension event', e, action);
        chrome.runtime.sendMessage({ id: 'chromeController.' + action });
      }
    default:
  }
});
