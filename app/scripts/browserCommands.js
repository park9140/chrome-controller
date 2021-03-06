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

function createNewTab() {

    chrome.tabs.create({url: chrome.extension.getURL('/popup.html')});

}

function closeTab() {
    getActiveTabIndex(function(activeTabIndex){
        getTabByIndex(activeTabIndex, function (tab) {
            chrome.tabs.remove(tab.id);
        });
    });
}

chrome.runtime.onMessage.addListener(function(e, sender, callback) {
  console.log('browserCommands.js - chrome event recieved: ', e.id);
  var message = e.id.split('.')[1];
  var playerId = e.playerId;
  switch(message) {
      case 'up':
      case 'down':
      case 'right':
      case 'left':
          messageEmitter.sendMove(message, playerId);
          break;
      case 'forward':
          messageEmitter.sendNavigation('forward');
          break;
      case 'back':
          messageEmitter.sendNavigation('backward');
          break;
      case 'active-tab-reload':
          onReloadTab();
          break;
      case 'next-tab':
          onNextTab();
          break;
      case 'prev-tab':
          onPreviousTab();
          break;
      case 'confirm':
          messageEmitter.sendSelect(playerId);
          break;
      case 'new-tab':
          createNewTab();
          break;
      case 'scroll-vertical':
          messageEmitter.scroll('vertical', e.actionValue);
          break;
      case 'scroll-horizontal':
          messageEmitter.scroll('horizontal', e.actionValue);
      case 'close-tab':
          closeTab();
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
