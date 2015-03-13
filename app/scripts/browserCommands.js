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

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('browserCommands.js - chrome event recieved: ', e.id);
  var message = e.id.split('.')[1];
  switch(message) {
      case 'up':
      case 'down':
      case 'right':
      case 'left':
          messageEmitter.sendMove(message);
          break;
      case 'forward':
          messageEmitter.sendNavigation('forward');
          break;
      case 'back':
          messageEmitter.sendNavigation('backward');
          break;
      case 'next-tab':
          onNextTab();
          break;
      case 'prev-tab':
          onPreviousTab();
          break;
      case 'confirm':
          messageEmitter.sendSelect();
          break;
      case 'cancel':
      case 'home':
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
