'use strict';

(function () {
  var LOCATION_MAX = 630;
  var LOCATION_MIN = 130;
  var MIN_PRICE = 300;
  var MAX_PRICE = 1000;
  var ROOMS_MAX = 4;
  var ROOMS_MIN = 1;
  var GUESTS_MAX = 4;
  var GUESTS_MIN = 1;

  var OFFER_TITLES = [
    'Лучшая Квартира В Токио Только летом',
    'Квартира на съем только на месяц в самом центре',
    'Прекрасный вид с 13 го этажа'
  ];

  var OFFER_DESCRIPTIONS = [
    'Офигенная квартира',
    'Обалденная квартира',
    'Если будет еще хоть чуточку лучше я сойду с ума'
  ];

  var CHECKIN_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

  var createDataArray = function () {
    var objectsNumber = 8;
    var adsArray = [];
    var locationX = window.tools.getRandomeInRange(LOCATION_MIN, LOCATION_MAX);
    var locationY = window.tools.getRandomeInRange(LOCATION_MIN, LOCATION_MAX);

    for (var i = 0; i < objectsNumber; i++) {
      adsArray[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': window.tools.getRandomElement(OFFER_TITLES),
          'address': locationX.toString() + ',' + locationY.toString(),
          'price': window.tools.getRandomeInRange(MIN_PRICE, MAX_PRICE),
          'type': window.tools.getRandomElement(OFFERS_TYPES),
          'rooms': window.tools.getRandomeInRange(ROOMS_MIN, ROOMS_MAX),
          'guests': window.tools.getRandomeInRange(GUESTS_MIN, GUESTS_MAX),
          'checkin': window.tools.getRandomElement(CHECKIN_CHECKOUT_TIMES),
          'checkout': window.tools.getRandomElement(CHECKIN_CHECKOUT_TIMES),
          'features': window.tools.getRandomArray(FEATURES),
          'description': window.tools.getRandomElement(OFFER_DESCRIPTIONS),
          'photos': window.tools.getRandomArray(PHOTOS),
        },
        'location': {
          'x': window.tools.getRandomeInRange(0, mapWidth),
          'y': window.tools.getRandomeInRange(LOCATION_MIN, LOCATION_MAX)
        }
      };
    }
    return adsArray;
  };

  window.data = {
    offers: createDataArray()
  };

})();
