'use strict';

(function() {
  document.getElementById('sendHelloButton')
          .addEventListener('click', function () {
            messageEmitter.sendMessageToCurrentTab("hello");
  });
})();
