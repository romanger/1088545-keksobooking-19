'use strict';

(function () {

  var fillTheMap = function (arr, template, destination) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var pin = template.cloneNode(true);
      pin = window.pin.addPin(arr[i], pin);
      fragment.appendChild(pin);
    }
    destination.appendChild(fragment);
  };

  window.map = {
    fillTheMap: fillTheMap
  };

})();
