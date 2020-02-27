'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = map.querySelector('.map__filters');

  var pageActivate = function () {
    adForm.classList.remove('ad-form--disabled');
    window.form.toggleFormFieldsStatus(adForm);
    window.form.toggleFormFieldsStatus(mapFilters);
    window.pin.getAddress('active');
    window.backend.load(window.map.insertPins, window.tools.addError);
    window.form.initFormValidation();
  };

  var pageDeactivate = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.card.removeCard();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.toggleFormFieldsStatus(adForm);
    window.form.toggleFormFieldsStatus(mapFilters);
    window.map.removePins(pins);
    window.pin.resetPinMainPosition();
  };

  window.main = {
    pageActivate: pageActivate,
    pageDeactivate: pageDeactivate
  };

})();
