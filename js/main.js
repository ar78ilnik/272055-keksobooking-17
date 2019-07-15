'use strict';

var QUARTERS_AND_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var mapLimits = {
  ymin: 0,
  xmin: 0,
  ymax: 630,
  xmax: 1200
};
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var fieldsets = document.querySelectorAll('[name="fieldset"]');
var pinMain = document.querySelector('.map__pin--main');
var addres = document.querySelector('#address');
var typeQuarters = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var inited = false;

var getMapPinMainCoords = function () {
  var mapPinMainPosition = {
    x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / 2),
    y: pinMain.offsetTop + pinMain.offsetHeight
  };
  return mapPinMainPosition;
};
var disableFieldsetAttribute = function (param) {
  for (var i = 0; i < param.length; i++) {
    param[i].setAttribute('disabled', 'disabled');
  }
};
var addressToInput = function (coords) {
  addres.value = coords.offsetLeft + ', ' + coords.offsetTop;
};
var pinAddress = function () {
  var addressInputCoords = getMapPinMainCoords();
  addres.value = addressInputCoords.x + ', ' + addressInputCoords.y;
};

disableFieldsetAttribute(fieldsets);

timeInInput.addEventListener('change', function (evt) {
  timeOutInput.value = evt.target.value;
});

timeOutInput.addEventListener('change', function (evt) {
  timeInInput.value = evt.target.value;
});

var syncPriceAndType = function (evt) {
  var onSelectValue = QUARTERS_AND_PRICE[evt.target.value];
  priceInput.min = onSelectValue;
  priceInput.placeholder = onSelectValue;
};

typeQuarters.addEventListener('change', syncPriceAndType);

pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var pinPosition = {
      x: pinMain.offsetLeft - shift.x,
      y: pinMain.offsetTop - shift.y
    };
    var border = {
      TOP: mapLimits.ymin - pinMain.offsetHeight,
      BOTTOM: mapLimits.ymax,
      LEFT: mapLimits.xmin,
      RIGHT: mapLimits.xmax - pinMain.offsetWidth
    };

    if (pinPosition.x > border.LEFT && pinPosition.x <= border.RIGHT) {
      pinMain.style.left = pinPosition.x + 'px';
    }
    if (pinPosition.y > border.TOP && pinPosition.y <= border.BOTTOM) {
      pinMain.style.top = pinPosition.y + 'px';
    }

    pinAddress();
    window.form.formEnable();
    window.map.enableMap();
  };
  var onMouseUp = function (upEvt) {

    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!inited) {
      var pins = window.pins.createPinObjects(8);
      window.pins.pinAppend(pins);
      window.form.assignFieldsetAttribute(fieldsets);
      addressToInput(pinMain);
    }

    inited = true;
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
