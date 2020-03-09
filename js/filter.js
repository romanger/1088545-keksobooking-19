'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var timeOut;
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('.map__filter');


  var createFilterArray = function () {
    var mapFeatures = mapFilter.querySelectorAll('.map__checkbox:checked');
    var filterArray = Array.from(mapFilterSelects).map(function (it) {
      return it.value;
    });
    var mapFeatureArray = Array.from(mapFeatures).map(function (it) {
      return it.value;
    });
    filterArray.push(mapFeatureArray);
    return filterArray;
  };

  var inRange = function (range, price) {
    switch (range) {
      case 'any':
        return true;
      case 'middle':
        return price >= 10000 && price <= 50000;
      case 'low':
        return price < 10000;
      case 'high':
        return price > 50000;
      default:
        return false;
    }
  };

  var pinsFilter = function (pins, filterValues) {
    var filtred = filterValues.reduce(function (accumulator, it, i, array) {
      var filtredPins = accumulator;

      if (array[i] === 'any' || array[i] === []) {
        return filtredPins;
      }

      switch (i) {
        case 0:
          filtredPins = filtredPins.filter(function (element) {
            return element.offer.type === it;
          });
          break;
        case 1:
          filtredPins = filtredPins.filter(function (element) {
            return inRange(it, element.offer.price);
          });
          break;
        case 2:
          filtredPins = filtredPins.filter(function (element) {
            return element.offer.rooms.toString() === it;
          });
          break;
        case 3:
          filtredPins = filtredPins.filter(function (element) {
            return element.offer.guests.toString() === it;
          });
          break;
        case 4:
          filtredPins = filtredPins.filter(function (element) {
            var flag = true;
            for (var j = 0; j < it.length; j++) {
              flag = element.offer.features.includes(it[j]);
              if (!flag) {
                break;
              }
            }
            return flag;
          });
          break;
        default:
          break;
      }
      return filtredPins;
    }, pins);
    return filtred;
  };

  var updateMapPins = function (arr) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var filterValues = createFilterArray();
    var filtredPins = pinsFilter(arr, filterValues);
    window.card.removeCard();
    window.map.removePins(pins);
    window.map.insertPins(filtredPins);
  };

  mapFilter.addEventListener('change', function () {
    if (timeOut) {
      window.clearTimeout(timeOut);
    }
    timeOut = window.setTimeout(function () {
      updateMapPins(window.backend.data);
    }, DEBOUNCE_INTERVAL);

  });

})();