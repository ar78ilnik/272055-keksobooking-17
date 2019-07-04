'use strict';
(function () {
  var formEnable = function () {
    form.classList.remove('ad-form--disabled');
  };

  var addressToInput = function (coords) {
    addres.value = coords.offsetLeft + ', ' + coords.offsetTop;
  };

  var enableMap = function () {
    mapPoint.classList.remove('map--faded');
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
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', function () {
        onMouseMove();
        formEnable();
        var pins = createPinObjects(8);
        pinAppend(pins);
        assignFieldsetAttribute(fieldsets);
      });
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
