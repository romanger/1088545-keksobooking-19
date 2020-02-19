'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 84;
  var PIN_PARAMS = {
    'width': 50,
    'height': 70
  };

  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');

  var getAddress = function (status) {
    var locationPinX = pinMain.offsetWidth / 2;
    var locationPinY = pinMain.offsetHeight / 2;
    if (status === 'active') {
      locationPinY = MAIN_PIN_HEIGHT;
    }
    var locationX = pinMain.offsetLeft + locationPinX;
    var locationY = pinMain.offsetTop + locationPinY;

    var startAddress = locationX + ', ' + locationY;
    adForm.querySelector('#address').value = startAddress;
  };

  var addPin = function (obj, node) {
    var img = node.querySelector('img');
    img.src = obj.author.avatar;
    img.alt = obj.offer.title;

    node.style.left = (obj.location.x - PIN_PARAMS.width / 2) + 'px';
    node.style.top = (obj.location.y - PIN_PARAMS.height) + 'px';

    return node;
  };

  var addCard = function (obj, node) {

    var title = node.querySelector('.popup__title');
    var address = node.querySelector('.popup__text--address');
    var price = node.querySelector('.popup__text--price');
    var type = node.querySelector('.popup__type');
    var capacity = node.querySelector('.popup__text--capacity');
    var time = node.querySelector('.popup__text--time');
    var features = node.querySelector('.popup__features');
    var description = node.querySelector('.popup__description');
    var photos = node.querySelector('.popup__photos');
    var avatar = node.querySelector('.popup__avatar');

    title.textContent = obj.offer.title;
    address.textContent = obj.offer.address;
    price.textContent = obj.offer.price + '₽/ночь';
    capacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;

    features.innerHTML = '';

    obj.offer.features.forEach(function (element) {
      var listElement = document.createElement('li');
      var elementClass = 'popup__feature--' + element;
      listElement.classList.add('popup__feature', elementClass);
      features.append(listElement);
    });

    photos.innerHTML = '';

    obj.offer.photos.forEach(function (element) {
      var photo = document.createElement('img');
      photo.src = element;
      photo.alt = 'Фотография жилья';
      photo.width = '45';
      photo.height = '40';

      photos.append(photo);
    });

    description.textContent = obj.offer.description;
    avatar.src = obj.author.avatar;

    switch (obj.offer.type) {
      case 'palace':
        type.textContent = 'Дворец';
        break;
      case 'house':
        type.textContent = 'Дом';
        break;
      case 'bungalo':
        type.textContent = 'Бунгало';
        break;
      case 'flat':
        type.textContent = 'Квартира';
        break;
      default:
        break;
    }

    return node;
  };

  getAddress();

  window.pin = {
    getAddress: getAddress,
    addPin: addPin,
    addCard: addCard,
  };

})();
