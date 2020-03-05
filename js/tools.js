'use strict';

(function () {
  var MOUSE_KEY = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var PINS_AMOUNT = 5;

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
    PINS_AMOUNT: PINS_AMOUNT,
    addError: addError,
    removeError: removeError,
  };

})();
