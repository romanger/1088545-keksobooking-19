'use strict';

(function () {
  var PINS_AMOUNT = 5;
  var mapFilters = document.querySelector('.map__filters');

  var insertToMap = function (arr, templаte, destination, getElement) {

    var fragment = document.createDocumentFragment();

    window.tools.removeError('.error-element');

    for (var i = 0; i < arr.length; i++) {
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
    var maxFive = arr.slice(0, PINS_AMOUNT);
    insertToMap(maxFive, pinTemplate, mapPinsArea, window.pin.addPin);
    window.form.enableFormFieldsStatus(mapFilters);
  };

  var removePins = function () {
    var mapPinsArea = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsArea.forEach(function (element) {
      element.remove();
    });
  };

  window.map = {
    insertPins: insertPins,
    removePins: removePins
  };

})();
