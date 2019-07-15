'use strict';
(function () {
  window.utils = {
    getRandomValue: function (values) {
      var index = Math.floor(Math.random() * values.length);
      return values[index];
    },
    getRandomNumber: function (maxNumber) {
      return Math.floor(Math.random() * maxNumber);
    }
  };
})();
