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

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var limits = {
        top: pinMain.offsetTop,
        bottom: pinMain.offsetHeight + pinMain.offsetTop - pinMain.offsetHeight
      };
      console.log(moveEvt.pageY);
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
