'use strict';

var bindings = {};
var mode = '';

chrome.storage.sync.get('bindings', function(response) {
  console.log('recieved bindings', response);
  bindings = response.bindings || {};
});

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('keyBindings.js - chrome event recieved: ', e.id);

  switch(e.id) {
    case 'chromeController.setBinding':
      var action = e.action;
      if (action.startsWith('keyboard-')) {
        action = action.replace('-', '.');
      }

      bindings[e.controller] = bindings[e.controller] || {};
      bindings[e.controller][e.button] = bindings[e.controller][e.button] || [];
      bindings[e.controller][e.button].push(action);
      chrome.storage.sync.set({ bindings: bindings });

      if (action === 'toggle-keyboard') {
        e.action = 'keyboard-' + e.action;
        chrome.runtime.sendMessage(e);
      }
      break;
    case 'chromeController.getBindings':
      callback(bindings);
      break;
    case 'chromeController.clearBindings':
      chrome.storage.sync.set({ bindings: {} });
      bindings = {};
      break;
    case 'chromeController.toggle-keyboard':
    case 'chromeController.keyboard.toggle-keyboard':
      mode = mode === 'keyboard' ? '' : 'keyboard';
      messageEmitter.sendToggleKeyboard();
      break;
    case 'chromeController.clearBinding':
      if (bindings[e.controllerIndex] && bindings[e.controllerIndex][e.buttonIndex] && bindings[e.controllerIndex][e.buttonIndex].indexOf(e.action) > -1) {
        var indexOfAction = bindings[e.controllerIndex][e.buttonIndex].indexOf(e.action);
        bindings[e.controllerIndex][e.buttonIndex].splice(indexOfAction, 1);
        if(bindings[e.controllerIndex][e.buttonIndex].length === 0) {
          delete bindings[e.controllerIndex][e.buttonIndex];
          if(Object.keys(bindings[e.controllerIndex]).length === 0) {
            delete bindings[e.controllerIndex];
          }
        }
      }

      chrome.storage.sync.set({ bindings: bindings });

      break;
    case 'controller.buttonPressed':
      var actions = bindings[e.controllerIndex] && bindings[e.controllerIndex][e.buttonIndex];
      if (actions) {
        console.log('translating button event into extension event', e, mode, actions);
        actions.forEach(function(action) {
          if (!mode && !action.includes('.') || action.split('.')[0] == mode) {
            chrome.runtime.sendMessage({ id: 'chromeController.' + action });
          }
        });
      }
      break;
    case 'controller.buttonUnpressed':
      var actions = bindings[e.controllerIndex] && bindings[e.controllerIndex][e.buttonIndex];
      if (actions) {
        actions.forEach(function(action) {
          chrome.runtime.sendMessage({ id: 'chromeController.' + action + '.unpress', playerId: e.controllerIndex });
        });
      }
      break;
    default:
  }
});
