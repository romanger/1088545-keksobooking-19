'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var onActivation = function (arr) {
    var fragment = document.createDocumentFragment();
    window.tools.removeError('.error-element');
    for (var i = 0; i < arr.length; i++) {
      var pin = pinTemplate.cloneNode(true);
      pin = window.pin.addPin(arr[i], pin);
      fragment.appendChild(pin);
    }
    mapPinsArea.appendChild(fragment);
  };

  window.map = {
    onActivation: onActivation,
  };

})();
