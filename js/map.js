'use strict';

(function () {

  var fillTheMap = function (arr, templete, destination, getElement) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var element = templete.cloneNode(true);
      element = getElement(arr[i], element);
      fragment.appendChild(element);
    }
    destination.appendChild(fragment);
  };

  var insertCard = function (arr, templete, destination, getElement) {

    var fragment = document.createDocumentFragment();
    var filtersContainer = document.querySelector('.map__filters-container');

    var element = templete.cloneNode(true);
    element = getElement(arr[0], element);
    fragment.appendChild(element);

    destination.insertBefore(fragment, filtersContainer);
  };

  window.map = {
    fillTheMap: fillTheMap,
    insertCard: insertCard
  };

})();
