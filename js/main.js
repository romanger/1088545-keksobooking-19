'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');


  var pageActivate = function () {
    adForm.classList.remove('ad-form--disabled');
    window.form.toggleFormFieldsStatus(adForm);
    window.pin.getAddress('active');
    window.backend.load(window.map.insertPins, window.tools.addError);
    window.form.initFormValidation();
  };

  var pageDeactivate = function () {
    window.card.remove();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.toggleFormFieldsStatus(adForm);
    window.form.toggleFormFieldsStatus(mapFilters);
    window.map.removePins();
    window.pin.resetPinMainPosition();
  };

  window.main = {
    pageActivate: pageActivate,
    pageDeactivate: pageDeactivate
  };

})();
