'use strict';

(function () {

  var insertToMap = function (arr, templete, destination, getElement) {
    var fragment = document.createDocumentFragment();
    window.tools.removeError('.error-element');
    for (var i = 0; i < arr.length; i++) {
      var element = templete.cloneNode(true);
      element = getElement(arr[i], element);
      fragment.appendChild(element);
    }
    destination.appendChild(fragment);
  }

  var insertPins = function (arr) {
    var mapPinsArea = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    insertToMap(arr, pinTemplate, mapPinsArea, window.pin.addPin);
  };

  var insertCard = function (arr, templete, destination, getElement) {

    var fragment = document.createDocumentFragment();
    var filtersContainer = document.querySelector('.map__filters-container');

    var element = templete.cloneNode(true);
    element = getElement(arr[0], element);
    fragment.appendChild(element);

    destination.insertBefore(fragment, filtersContainer);
  };

  window.map = {
    insertPins: insertPins,
    insertCard: insertCard
  };

})();
