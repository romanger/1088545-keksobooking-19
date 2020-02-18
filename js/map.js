'use strict';

(function () {

  var fillTheMap = function (arr, templet, destination, getElement) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var element = templet.cloneNode(true);
      element = getElement(arr[i], element);
      fragment.appendChild(element);
    }
    destination.appendChild(fragment);
  };

  window.map = {
    fillTheMap: fillTheMap
  };

})();
