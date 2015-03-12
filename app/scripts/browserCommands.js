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

document.addEventListener('chromeController.previousTab', onPreviousTab);

function onNextTab() {
    getActiveTabIndex(function(activeTabIndex){
        getTabByIndex(++activeTabIndex, function (tab) {
            chrome.tabs.update(tab.id , {active: true});
        });
    });
}

document.addEventListener('chromeController.nextTab', onNextTab);

chrome.commands.onCommand.addListener(function(command) {
    var tabEvent;
    switch (command) {
        case 'nextTab':
            tabEvent = new CustomEvent('chromeController.nextTab');
            document.dispatchEvent(tabEvent);
            break;
        case 'previousTab':
            tabEvent = new CustomEvent('chromeController.previousTab');
            document.dispatchEvent(tabEvent);
            break;
        case 'up':
        case 'down':
        case 'left':
        case 'right':
            messageEmitter.sendMessageToCurrentTab(command);
            break;
    }
});
