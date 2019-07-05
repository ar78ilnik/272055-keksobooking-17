'use strict';
(function () {
  var formEnable = function () {
    form.classList.remove('ad-form--disabled');
  };

  var enableMap = function () {
    mapPoint.classList.remove('map--faded');
  };

  var addressToInput = function (coords) {
    addres.value = coords.offsetLeft + ', ' + coords.offsetTop;
  };
  var limits = {
    top: mapPoint.offsetTop,
    right: mapPoint.offsetWidth + mapPoint.offsetLeft - pinMain.offsetWidth,
    bottom: mapPoint.offsetHeight + mapPoint.offsetTop - pinMain.offsetHeight,
    left: mapPoint.offsetLeft
  };
  pinMain.addEventListener('mousedown', function (evt) {
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
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      formEnable();
      enableMap();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var pins = createPinObjects(8);
      pinAppend(pins);
      addressToInput(pinMain);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
