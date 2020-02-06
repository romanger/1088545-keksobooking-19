'use strict';

(function () {
  var MOUSE_KEY = 0;
  var ENTER_KEY = 'Enter';

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
    getRandomeInRange: getRandomeInRange,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray
  };

})();
