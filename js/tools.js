'use strict';

(function () {
  var MOUSE_KEY = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  //TODO Create error message for load pins

  var addError = function (message) {
    var node = document.createElement('div');
    node.classList.add('error-element');
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removeError = function (errorClass) {
    var error = document.querySelector(errorClass);
    if (error) {
      error.remove();
    }
  };

  window.tools = {
    MOUSE_KEY: MOUSE_KEY,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    addError: addError,
    removeError: removeError,
  };

})();
