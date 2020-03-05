'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var housingTypeSelect = mapFilter.querySelector('#housing-type');

  var housingTipeFilter = function (arr, type) {
    if (type === 'any') {
      return arr;
    }
    var thisHousingTipeArray = arr.filter(function (it) {
      return it.offer.type === type;
    });
    return thisHousingTipeArray;
  };

  var updateMapPins = function (arr) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var filtredPins = housingTipeFilter(arr, housingTypeSelect.value);
    window.card.removeCard();
    window.map.removePins(pins);
    window.map.insertPins(filtredPins);
  };

  mapFilter.addEventListener('change', function () {
    updateMapPins(window.backend.data);
  });

})();
