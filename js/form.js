'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var guests = adForm.querySelector('#capacity');
  var rooms = adForm.querySelector('#room_number');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  var minPricing = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var toggleFormFieldsStatus = function (form) {
    var elements = form.children;
    for (var i = 0; i < elements.length; i++) {
      if ((elements[i].tagName === 'FIELDSET' || elements[i].tagName === 'SELECT') && elements[i].disabled === false) {
        elements[i].disabled = true;
      } else {
        elements[i].disabled = false;
      }
    }
  };

  var syncTime = function (firstInput, secondInput) {
    firstInput.value = secondInput.value;
  };

  var аpartmentsTypeValidate = function () {
    switch (type.value) {
      case 'bungalo':
        price.setAttribute('min', minPricing.bungalo);
        price.setAttribute('placeholder', minPricing.bungalo);
        break;
      case 'flat':
        price.setAttribute('min', minPricing.flat);
        price.setAttribute('placeholder', minPricing.flat);
        break;
      case 'house':
        price.setAttribute('min', minPricing.house);
        price.setAttribute('placeholder', minPricing.house);
        break;
      case 'palace':
        price.setAttribute('min', minPricing.palace);
        price.setAttribute('placeholder', minPricing.palace);
        break;
      default:
        break;
    }
  };

  var guestRoomValidate = function () {
    if (+rooms.value < +guests.value && +guests.value !== 0) {
      guests.setCustomValidity('Для всех гостей не хватит комнат');
      return;
    } else if (+rooms.value === 100 && +guests.value !== 0) {
      guests.setCustomValidity('Эти апартаменты не для гостей');
      return;
    } else if (+rooms.value !== 100 && +guests.value === 0) {
      guests.setCustomValidity('Эти апартаменты для гостей');
      return;
    }
    guests.setCustomValidity('');
  };

  var initFormValidation = function () {
    guestRoomValidate();
    аpartmentsTypeValidate();
  };

  type.addEventListener('change', function () {
    аpartmentsTypeValidate();
  });

  guests.addEventListener('change', function () {
    guestRoomValidate();
  });

  rooms.addEventListener('change', function () {
    guestRoomValidate();
  });

  timein.addEventListener('change', function (evt) {
    syncTime(timeout, evt.target);
  });

  timeout.addEventListener('change', function (evt) {
    syncTime(timein, evt.target);
  });

  toggleFormFieldsStatus(adForm);
  toggleFormFieldsStatus(mapFilters);

  window.form = {
    toggleFormFieldsStatus: toggleFormFieldsStatus,
    initFormValidation: initFormValidation
  };

})();
