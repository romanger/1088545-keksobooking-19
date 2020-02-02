'use strict';

var LOCATION_MAX = 630;
var LOCATION_MIN = 130;
var MIN_PRICE = 300;
var MAX_PRICE = 1000;
var ROOMS_MAX = 4;
var ROOMS_MIN = 1;
var GUESTS_MAX = 4;
var GUESTS_MIN = 1;

var PIN_PARAMS = {
  'width': 50,
  'height': 70
};

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
var mapPinsArea = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


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
}

var createDataArray = function () {
  var objectsNumber = 8;
  var adsArray = [];
  var locationX = getRandomeInRange(LOCATION_MIN, LOCATION_MAX);
  var locationY = getRandomeInRange(LOCATION_MIN, LOCATION_MAX);

  for (var i = 0; i < objectsNumber; i++) {
    adsArray[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': getRandomElement(OFFER_TITLES),
        'address': locationX.toString() + ',' + locationY.toString(),
        'price': getRandomeInRange(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(OFFERS_TYPES),
        'rooms': getRandomeInRange(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomeInRange(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomElement(CHECKIN_CHECKOUT_TIMES),
        'checkout': getRandomElement(CHECKIN_CHECKOUT_TIMES),
        'features': getRandomArray(FEATURES),
        'description': getRandomElement(OFFER_DESCRIPTIONS),
        'photos': getRandomArray(PHOTOS),
      },
      'location': {
        'x': getRandomeInRange(0, mapWidth),
        'y': getRandomeInRange(LOCATION_MIN, LOCATION_MAX)
      }
    };
  }
  return adsArray;
};

var addPin = function (obj, node) {
  var img = node.querySelector('img');
  img.src = obj.author.avatar;
  img.alt = obj.offer.title;

  node.style.left = (obj.location.x - PIN_PARAMS.width / 2) + 'px';
  node.style.top = (obj.location.y - PIN_PARAMS.height) + 'px';

  return node;
};

var fillTheMap = function (arr, template, destination) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var pin = template.cloneNode(true);
    pin = addPin(arr[i], pin);
    fragment.appendChild(pin);
  }
  destination.appendChild(fragment);
};

var offers = createDataArray();
map.classList.remove('map--faded');

fillTheMap(offers, pinTemplate, mapPinsArea);
