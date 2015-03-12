'use strict';

(function() {
  document.getElementById('sendHelloButton')
          .addEventListener('click', function () {
            messageEmitter.sendMessageToCurrentTab("hello");
  });

  document.getElementById('sendZoom')
    .addEventListener('click', function() {
      messageEmitter.sendZoom();
    });
})();
