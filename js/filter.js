'use strict';

(function () {

  var priceRangeMap = {
    'top': 50000,
    'bottom': 10000
  };

  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('.map__filter');

  var collectFilterParams = function () {
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

  var checkIfInRange = function (range, price) {
    switch (range) {
      case 'any':
        return true;
      case 'middle':
        return price >= priceRangeMap.bottom && price <= priceRangeMap.top;
      case 'low':
        return price < priceRangeMap.bottom;
      case 'high':
        return price > priceRangeMap.top;
      default:
        return false;
    }
  };

  var filterPins = function (pins, filterValues) {
    var filtered = filterValues.reduce(function (accumulator, it, i, array) {
      var filteredPins = accumulator;

      if (array[i] === 'any' || array[i] === []) {
        return filteredPins;
      }

      switch (i) {
        case 0:
          filteredPins = filteredPins.filter(function (element) {
            return element.offer.type === it;
          });
          break;
        case 1:
          filteredPins = filteredPins.filter(function (element) {
            return checkIfInRange(it, element.offer.price);
          });
          break;
        case 2:
          filteredPins = filteredPins.filter(function (element) {
            return element.offer.rooms.toString() === it;
          });
          break;
        case 3:
          filteredPins = filteredPins.filter(function (element) {
            return element.offer.guests.toString() === it;
          });
          break;
        case 4:
          filteredPins = filteredPins.filter(function (element) {
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
      return filteredPins;
    }, pins);
    return filtered;
  };

  var updateMapPins = function (arr) {
    var filterParams = collectFilterParams();
    var filteredPins = filterPins(arr, filterParams);
    window.card.removeCard();
    window.map.removePins();
    window.map.insertPins(filteredPins);
  };

  mapFilter.addEventListener('change', function () {
    window.tools.debounce(updateMapPins, window.backend.data);
  });

})();
