'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = map.querySelector('.map__filters');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var pageActivate = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toggleFormFieldsStatus(adForm);
    window.form.toggleFormFieldsStatus(mapFilters);
    window.pin.getAddress('active');
    window.map.insertCard(window.data.offers, cardTemplate, map, window.pin.addCard);
    window.backend.load(window.map.insertPins, window.tools.addError);
    window.form.initFormValidation();
  };

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.tools.MOUSE_KEY) {
      pageActivate();
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.tools.ENTER_KEY) {
      pageActivate();
    }
  });

})();
