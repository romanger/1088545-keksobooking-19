'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 84;
  var TOP_MOVE_LIMIT = 130;
  var LEFT_MOVE_LIMIT = 0;
  var BOTTOM_MOVE_LIMIT = 630;

  var PinParameter = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var pinLimitRight = map.offsetWidth - pinMain.offsetWidth / 2;
  var pinLimitLeft = LEFT_MOVE_LIMIT - pinMain.offsetWidth / 2;

  var pinMainStartPosition = {
    top: pinMain.style.top,
    left: pinMain.style.left
  };

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

    node.style.left = (obj.location.x - PinParameter.WIDTH / 2) + 'px';
    node.style.top = (obj.location.y - PinParameter.HEIGHT) + 'px';

    return node;
  };

  var resetPinMainPosition = function () {
    pinMain.style.top = pinMainStartPosition.top;
    pinMain.style.left = pinMainStartPosition.left;
  };

  var addPinClickListener = function (element, object) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.open(object);
    });
  };

  var addPinEnterListener = function (element, object) {
    element.addEventListener('keydown', function (evt) {
      if (evt.key === window.tools.ENTER_KEY) {
        evt.preventDefault();
        window.card.open(object);
      }
    });
  };

  var onMainPinClick = function (evt) {
    if (evt.button === window.tools.MOUSE_KEY) {
      evt.preventDefault();
      var active = false;

      if (map.classList.contains('map--faded')) {
        map.classList.remove('map--faded');
        active = true;
      }
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMainPinMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var top = pinMain.offsetTop - shift.y;
        var left = pinMain.offsetLeft - shift.x;

        if (top >= TOP_MOVE_LIMIT && top <= BOTTOM_MOVE_LIMIT) {
          pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        }
        if (left >= pinLimitLeft && left <= pinLimitRight) {
          pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        }
      };

      var onMainPinMouseUp = function (upEvt) {
        upEvt.preventDefault();
        if (active) {
          window.main.pageActivate();
        }
        getAddress();
        document.removeEventListener('mousemove', onMainPinMouseMove);
        document.removeEventListener('mouseup', onMainPinMouseUp);
      };

      document.addEventListener('mousemove', onMainPinMouseMove);
      document.addEventListener('mouseup', onMainPinMouseUp);
      pinMain.removeEventListener('keydown', onMainPinEnter);
    }
  };

  var onMainPinEnter = function (evt) {
    if (evt.key === window.tools.ENTER_KEY) {
      map.classList.remove('map--faded');
      window.main.pageActivate();
      pinMain.removeEventListener('keydown', onMainPinEnter);
    }
  };

  pinMain.addEventListener('mousedown', onMainPinClick);
  pinMain.addEventListener('keydown', onMainPinEnter);

  getAddress();

  window.pin = {
    getAddress: getAddress,
    addPin: addPin,
    addPinClickListener: addPinClickListener,
    addPinEnterListener: addPinEnterListener,
    resetPinMainPosition: resetPinMainPosition
  };

})();
