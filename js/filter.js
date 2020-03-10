'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var housingTypeSelect = mapFilter.querySelector('#housing-type');

  var housingTypeFilter = function (arr, type) {
    if (type === 'any') {
      return arr;
    } else {
      var thisHousingType = arr.filter(function (it) {
        return it.offer.type === type;
      });
      return thisHousingType;
    }
  };

  var updateMapPins = function (arr, filterValue) {
    var filtredPins = housingTypeFilter(arr, filterValue);
    window.card.removeCard();
    window.map.removePins();
    window.map.insertPins(filtredPins);
  };

  housingTypeSelect.addEventListener('change', function (evt) {
    updateMapPins(window.backend.data, evt.target.value);
  });

})();
