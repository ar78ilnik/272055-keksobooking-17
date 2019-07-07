'use strict';

(function () {
  var inited = false;
  var formEnable = function () {
    window.form.classList.remove('ad-form--disabled');
  };

  var enableMap = function () {
    window.map.classList.remove('map--faded');
  };

  var addressToInput = function (coords) {
    window.addres.value = coords.offsetLeft + ', ' + coords.offsetTop;
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top,
      left: box.left + 20,
      right: box.right,
      bottom: box.bottom + 60
    };
  };
  var mapLimits = window.map.getBoundingClientRect();
  window.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var newLocation = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      }
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      console.log(moveEvt.pageX, 'pageX', mapLimits, moveEvt.pageX > mapLimits.right, moveEvt.pageX > mapLimits.left);
      if (moveEvt.pageX > mapLimits.right) {
        newLocation.x = mapLimits.right;
      } else if (moveEvt.pageX < mapLimits.left) {
        newLocation.x = moveEvt.pageX;
      }
      if (moveEvt.pageY > mapLimits.bottom) {
        newLocation.y = mapLimits.bottom;
      } else if (moveEvt.pageY > mapLimits.top) {
        newLocation.y = moveEvt.pageY;
      }
      relocate(newLocation);
      if (!inited) {
        formEnable();
        enableMap();
      }

    };
    var relocate = function (newLocation) {
      window.pinMain.style.left = newLocation.x + 'px';
      window.pinMain.style.top = newLocation.y + 'px';
    }
    /*window.pinMain.style.left = (window.pinMain.offsetLeft - shift.x) + 'px';
    window.pinMain.style.top = (window.pinMain.offsetTop - shift.y) + 'px';*/
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (!inited) {
        var pins = window.createPinObjects(8);
        window.pinAppend(pins);
        addressToInput(window.pinMain);
        inited = true;
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
