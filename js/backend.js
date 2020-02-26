'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var request = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = request(onLoad, onError);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = request(onLoad, onError);

    xhr.open('POST', SEND_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };

})();
