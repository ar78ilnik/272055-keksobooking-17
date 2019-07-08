'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var WIDTH_LOCATION = 1200;
var HEIGHT_LOCATION = 750;
var QUARTERS_AND_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');

var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fieldsets = document.querySelectorAll('[name="fieldset"]');
var pinMain = document.querySelector('.map__pin--main');
var addres = document.querySelector('#address');
var form = document.querySelector('.ad-form');
var map = document.querySelector('.map');
var typeQuarters = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var inited = false;
var mapLimits = {
  xmin: 0,
  xmax: 1200,
  ymin: 130,
  ymax: 630
};

var getRandomValue = function (values) {
  var index = Math.floor(Math.random() * values.length);
  return values[index];
};

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};
var formEnable = function () {
  form.classList.remove('ad-form--disabled');
};
var enableMap = function () {
  map.classList.remove('map--faded');
};
var addressToInput = function (coords) {
  addres.value = coords.offsetLeft + ', ' + coords.offsetTop;
};
var createPinObjects = function (pinsCount) {
  var Arraypins = [];
  for (var i = 0; i < pinsCount; i++) {
    var pin = {
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {type: getRandomValue(TYPES)},
      location: {x: (getRandomNumber(WIDTH_LOCATION) + 25), y: getRandomNumber(HEIGHT_LOCATION)}
    };
    Arraypins.push(pin);
  }
  return Arraypins;
};

var renderPin = function (pinValues) {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pinValues.location.x + 'px; top: ' + pinValues.location.y + 'px;';
  pinElement.firstChild.src = pinValues.author.avatar;
  pinElement.firstChild.alt = pinValues.offer.type;
  return pinElement;
};

var pinAppend = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var pin = pins[i];
    fragment.appendChild(renderPin(pin));
  }
  mapPins.appendChild(fragment);
};

var assignFieldsetAttribute = function (param) {
  for (var i = 0; i < param.length; i++) {
    param[i].removeAttribute('disabled');
  }
};

var disableFieldsetAttribute = function (param) {
  for (var i = 0; i < param.length; i++) {
    param[i].setAttribute('disabled', 'disabled');
  }
};

var syncPriceAndType = function (evt) {
  var onSelectValue = QUARTERS_AND_PRICE[evt.target.value];
  priceInput.min = onSelectValue;
  priceInput.placeholder = onSelectValue;
};

disableFieldsetAttribute(fieldsets);

timeInInput.addEventListener('change', function (evt) {
  timeOutInput.value = evt.target.value;
});

timeOutInput.addEventListener('change', function (evt) {
  timeInInput.value = evt.target.value;
});

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
    var pinMainCoords = {
      x: pinMain.offsetLeft - shift.x,
      y: pinMain.offsetTop - shift.y
    };
    var mapPinLimits = {
      top: mapLimits.ymin - pinMain.offsetHeight,
      right: mapLimits.xmax - pinMain.offsetWidth,
      bottom: mapLimits.ymax - pinMain.offsetHeight,
      left: mapLimits.xmin
    };
    if (pinMainCoords.x > mapPinLimits.left && mapPinLimits.right < pinMainCoords.x) {
      pinMain.style.left = mapPinLimits.x + 'px';
    }
    if (pinMainCoords.y > mapPinLimits.top && mapPinLimits.bottom > pinMainCoords.y) {
      pinMain.style.top = mapPinLimits.y + 'px';
    }
    formEnable();
    enableMap();
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (!inited) {
      var pins = createPinObjects(8);
      pinAppend(pins);
      assignFieldsetAttribute(fieldsets);
      addressToInput(pinMain);
    }
    inited = true;
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
