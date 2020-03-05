'use strict';

(function () {

  var insertToMap = function (arr, templаte, destination, getElement) {
    var fragment = document.createDocumentFragment();
    var amount = window.tools.PINS_AMOUNT;

    if (arr.length < amount) {
      amount = arr.length;
    }

    window.tools.removeError('.error-element');

    for (var i = 0; i < amount; i++) {
      var element = templаte.cloneNode(true);
      element = getElement(arr[i], element);

      window.pin.addPinClickListener(element, arr[i]);
      window.pin.addPinEnterListener(element, arr[i]);
      fragment.appendChild(element);
    }
    destination.appendChild(fragment);
  };

  var insertPins = function (arr) {
    var mapPinsArea = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    insertToMap(arr, pinTemplate, mapPinsArea, window.pin.addPin);
  };

  var removePins = function (arr) {
    arr.forEach(function (element) {
      element.remove();
    });
  };

  window.map = {
    insertPins: insertPins,
    removePins: removePins
  };

})();
