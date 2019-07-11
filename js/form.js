'use strict';
(function () {
  window.form = {
    formEnable: function () {
      var form = document.querySelector('.ad-form');
      form.classList.remove('ad-form--disabled');
    },
    assignFieldsetAttribute: function (param) {
      for (var i = 0; i < param.length; i++) {
        param[i].removeAttribute('disabled');
      }
    }
  };
})();
