'use strict';

(function () {

  var insertToMap = function (arr, templаte, destination, getElement) {
    var fragment = document.createDocumentFragment();
    window.tools.removeError('.error-element');
    for (var i = 0; i < arr.length; i++) {
      var element = templаte.cloneNode(true);
      element = getElement(arr[i], element);

      window.pin.addPinClickListener(element, arr[i]);
      fragment.appendChild(element);
    }
    destination.appendChild(fragment);
  };

  var insertPins = function (arr) {
    var mapPinsArea = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    insertToMap(arr, pinTemplate, mapPinsArea, window.pin.addPin);
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  }

  var insertCard = function (object) {
    var map = document.querySelector('.map');
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var filtersContainer = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    var element = template.cloneNode(true);

    element = window.pin.addCard(object, element);
    fragment.appendChild(element);

    map.insertBefore(fragment, filtersContainer);
  };

  window.map = {
    insertPins: insertPins,
    removeCard: removeCard,
    insertCard: insertCard
  };

})();
