'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var guests = adForm.querySelector('#capacity');
  var rooms = adForm.querySelector('#room_number');

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
  };

  guests.addEventListener('change', function () {
    guestRoomValidate();
  });

  rooms.addEventListener('change', function () {
    guestRoomValidate();
  });

  toggleFormFieldsStatus(adForm);
  toggleFormFieldsStatus(mapFilters);

  window.form = {
    toggleFormFieldsStatus: toggleFormFieldsStatus,
    initFormValidation: initFormValidation
  };

})();
