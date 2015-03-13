'use strict';
function getActiveTabIndex(callback) {
    return chrome.tabs.query({active: true}, function(tab) {
        callback(tab[0].index);
    });
}
function getTabByIndex(index, callback) {
    return chrome.tabs.query({index: index}, function(tab) {
        callback(tab[0]);
    });
}

function onPreviousTab() {
    getActiveTabIndex(function(activeTabIndex){
        getTabByIndex(--activeTabIndex, function (tab) {
            chrome.tabs.update(tab.id , {active: true});
        });
    });
}
function onNextTab() {
    getActiveTabIndex(function(activeTabIndex){
        getTabByIndex(++activeTabIndex, function (tab) {
            chrome.tabs.update(tab.id , {active: true});
        });
    });
}

function onReloadTab() {
    getActiveTabIndex(function(activeTabIndex){
        getTabByIndex(activeTabIndex, function (tab) {
            chrome.tabs.reload(tab.id);
        });
    });
}

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('browserCommands.js - chrome event recieved: ', e.id);
  var message = e.id.split('.')[1];
  switch(e.id) {
      case 'chromeController.up':
      case 'chromeController.down':
      case 'chromeController.right':
      case 'chromeController.left':
          messageEmitter.sendMove(message);
          break;
      case 'chromeController.forward':
          messageEmitter.sendNavigation('forward');
          break;
      case 'chromeController.back':
          messageEmitter.sendNavigation('backward');
          break;
      case 'chromeController.active-tab-reload':
          onReloadTab();
          break;
      case 'chromeController.next-tab':
          onNextTab();
          break;
      case 'chromeController.prev-tab':
          onPreviousTab();
          break;
      case 'chromeController.confirm':
          messageEmitter.sendSelect();
          break;
      case 'chromeController.cancel':
      case 'chromeController.home':
          break;
  }
});

chrome.commands.onCommand.addListener(function(command) {
    var tabEvent;
    switch (command) {
        case 'up':
        case 'down':
        case 'left':
        case 'right':
            messageEmitter.sendMove(command);
            break;
    }
});
