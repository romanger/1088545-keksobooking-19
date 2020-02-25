'use strict';

(function () {
  var MOUSE_KEY = 0;
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

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

  var getRandomeInRange = function (min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  };

  var getRandomElement = function (thisArray) {
    var randomElement = thisArray[Math.floor(Math.random() * thisArray.length)];
    return randomElement;
  };

  var getRandomArray = function (thisArray) {
    var randomLength = Math.floor(Math.random() * ((thisArray.length) - 1 + 1)) + 1;
    var randomArray = [];

    for (var i = 0; i < randomLength; i++) {
      randomArray[i] = thisArray[i];
    }
    return randomArray;
  };


  window.tools = {
    MOUSE_KEY: MOUSE_KEY,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    BUNGALO_MIN_PRICE: BUNGALO_MIN_PRICE,
    FLAT_MIN_PRICE: FLAT_MIN_PRICE,
    HOUSE_MIN_PRICE: HOUSE_MIN_PRICE,
    PALACE_MIN_PRICE: PALACE_MIN_PRICE,
    getRandomeInRange: getRandomeInRange,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray,
    addError: addError,
    removeError: removeError,
  };

})();
