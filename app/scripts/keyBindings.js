'use strict';

var bindings = {};
var mode = {};

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
      mode[e.playerId] = mode[e.playerId] === 'keyboard' ? '' : 'keyboard';
      messageEmitter.sendToggleKeyboard(mode[e.playerId] === 'keyboard', e.playerId);
      break;
    case 'chromeController.clearBinding':
      if (bindings[e.controllerIndex] && bindings[e.controllerIndex][e.actionId] && bindings[e.controllerIndex][e.actionId].indexOf(e.action) > -1) {
        var indexOfAction = bindings[e.controllerIndex][e.actionId].indexOf(e.action);
        bindings[e.controllerIndex][e.actionId].splice(indexOfAction, 1);
        if(bindings[e.controllerIndex][e.actionId].length === 0) {
          delete bindings[e.controllerIndex][e.actionId];
          if(Object.keys(bindings[e.controllerIndex]).length === 0) {
            delete bindings[e.controllerIndex];
          }
        }
      }

      chrome.storage.sync.set({ bindings: bindings });

      break;
    case 'controller.buttonPressed':
      var actions = bindings[e.controllerIndex] && bindings[e.controllerIndex][e.actionId];
      if (actions) {
        console.log('translating button event into extension event', e, mode[e.controllerIndex], actions);
        actions.forEach(function(action) {
          if (!mode[e.controllerIndex] && !action.includes('.') || action.split('.')[0] == mode[e.controllerIndex]) {
            chrome.runtime.sendMessage({ id: 'chromeController.' + action, playerId: e.controllerIndex, actionValue: e.value  });
          }
        });
      }
      break;
    case 'controller.buttonUnpressed':
      var actions = bindings[e.controllerIndex] && bindings[e.controllerIndex][e.actionId];
      if (actions) {
        actions.forEach(function(action) {
          chrome.runtime.sendMessage({ id: 'chromeController.' + action + '.unpress', playerId: e.controllerIndex, actionValue: e.value });
        });
      }
      break;
    default:
  }
});
