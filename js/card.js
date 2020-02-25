'use strict';

(function () {

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
    addCardClose(node);
    return node;
  };

  var openCard = function (object) {
    removeCard();
    insertCard(object);
  };

  var onCardEscPress = function (evt) {
    if (evt.key === window.tools.ESC_KEY) {
      removeCard();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var addCardClose = function (card) {
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', removeCard);
    document.addEventListener('keydown', onCardEscPress);
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var insertCard = function (object) {
    var map = document.querySelector('.map');
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var filtersContainer = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    var element = template.cloneNode(true);

    element = addCard(object, element);
    fragment.appendChild(element);

    map.insertBefore(fragment, filtersContainer);
  };

  window.card = {
    addCard: addCard,
    openCard: openCard,
    insertCard: insertCard,
  };

})();
