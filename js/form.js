'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var PreviewDimensions = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var аpartmentMinPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var guests = adForm.querySelector('#capacity');
  var rooms = adForm.querySelector('#room_number');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var reserButton = adForm.querySelector('.ad-form__reset');
  var avatarInput = adForm.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var photoInput = adForm.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = adForm.querySelector('.ad-form__photo');

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

  var enableFormFieldsStatus = function (form) {
    var elements = form.children;
    for (var i = 0; i < elements.length; i++) {
      if ((elements[i].tagName === 'FIELDSET' || elements[i].tagName === 'SELECT') && elements[i].disabled === true) {
        elements[i].disabled = false;
      }
    }
  };

  var syncTime = function (firstInput, secondInput) {
    firstInput.value = secondInput.value;
  };

  var showPreviewImage = function (input) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (input === avatarInput) {
          avatarPreview.src = reader.result;
        } else if (input === photoInput) {
          var photoImage = document.createElement('img');
          photoImage.src = reader.result;
          photoImage.width = PreviewDimensions.WIDTH;
          photoImage.height = PreviewDimensions.HEIGHT;
          photoPreview.appendChild(photoImage);
        }
      });

      reader.readAsDataURL(file);
    }
  };


  var аpartmentsTypeValidate = function () {
    price.setAttribute('min', аpartmentMinPriceMap[type.value]);
    price.setAttribute('placeholder', аpartmentMinPriceMap[type.value]);
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

  var onClickMessage = function (element) {
    if (element.classList.contains('success') || element.classList.contains('error')) {
      element.addEventListener('click', function (evt) {
        evt.target.remove();
      });
    }
  };

  var onClickErrorMessageButton = function () {
    var error = document.querySelector('.error');
    var button = error.querySelector('.error__button');

    button.addEventListener('click', function () {
      error.remove();
    });
  };

  var removeMessage = function (element, listener) {
    element.remove();
    document.removeEventListener('keydown', listener);
  };

  var onErrorEscapePress = function (evt) {
    if (evt.key === window.tools.ESC_KEY) {
      var error = document.querySelector('.error');
      removeMessage(error, onErrorEscapePress);
    }
  };

  var onSuccessEscapePress = function (evt) {
    if (evt.key === window.tools.ESC_KEY) {
      var success = document.querySelector('.success');
      removeMessage(success, onSuccessEscapePress);
    }
  };

  var openSuccessMessage = function () {
    var templаte = document.querySelector('#success').content.querySelector('.success');
    var element = templаte.cloneNode(true);
    main.appendChild(element);
    onClickMessage(element);
    document.addEventListener('keydown', onSuccessEscapePress);
  };

  var openErrorMessage = function (message) {
    var templаte = document.querySelector('#error').content.querySelector('.error');
    var element = templаte.cloneNode(true);
    var errorText = element.querySelector('.error__message');

    errorText.textContent = message;
    main.appendChild(element);
    onClickMessage(element);
    onClickErrorMessageButton();
    document.addEventListener('keydown', onErrorEscapePress);
  };

  var formSent = function () {
    window.main.pageDeactivate();
    adForm.reset();
    openSuccessMessage();
  };

  var formSendError = function (response) {
    openErrorMessage(response);
  };

  avatarInput.addEventListener('change', function (evt) {
    showPreviewImage(evt.target);
  });

  photoInput.addEventListener('change', function (evt) {
    showPreviewImage(evt.target);
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(adForm), formSent, formSendError);
  });

  reserButton.addEventListener('click', function () {
    window.main.pageDeactivate();
  });

  window.form = {
    toggleFormFieldsStatus: toggleFormFieldsStatus,
    enableFormFieldsStatus: enableFormFieldsStatus,
    initFormValidation: initFormValidation
  };

})();
