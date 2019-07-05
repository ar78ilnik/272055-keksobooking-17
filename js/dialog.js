'use strict';
(function () {
  var formEnable = function () {
    window.form.classList.remove('ad-form--disabled');
  };

  var enableMap = function () {
    window.mapPoint.classList.remove('map--faded');
  };

  var addressToInput = function (coords) {
    window.addres.value = coords.offsetLeft + ', ' + coords.offsetTop;
  };
  var limits = {
    top: window.mapPoint.offsetTop,
    right: window.mapPoint.offsetWidth + window.mapPoint.offsetLeft - window.pinMain.offsetWidth,
    bottom: window.mapPoint.offsetHeight + window.mapPoint.offsetTop - window.pinMain.offsetHeight,
    left: window.mapPoint.offsetLeft
  };
  window.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var getBorderLimits = {
        x: limits.left,
        y: limits.top
      };
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (moveEvt.pageX > limits.right) {
        getBorderLimits.x = limits.right;
      } else if (moveEvt.pageX > limits.left) {
        getBorderLimits.x = moveEvt.pageX;
      }
      window.pinMain.style.left = (window.pinMain.offsetLeft - shift.x) + 'px';
      window.pinMain.style.top = (window.pinMain.offsetTop - shift.y) + 'px';
      formEnable();
      enableMap();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var pins = window.createPinObjects(8);
      window.pinAppend(pins);
      addressToInput(window.pinMain);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
