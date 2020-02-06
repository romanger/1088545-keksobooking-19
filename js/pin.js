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

  getAddress();

  window.pin = {
    getAddress: getAddress,
    addPin: addPin
  };

})();
