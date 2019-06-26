'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var WIDTH_LOCATION = 1200;
var HEIGHT_LOCATION = 750;

var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var form = document.querySelector('.ad-form');

var fields = form.getElementsByTagName('fieldset');
for (var i = 0; i < fields.length; i++) {
  fields[i].setAttribute('disabled', 'disabled');
}

var mapPins = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters');
mapFilters.setAttribute('disabled', 'disabled');

var pinMain = document.querySelector('.map__pin--main');
pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };


  }
  var onMouseUp = function (moveEvt) {
    moveEvt.preventDefault();

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

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var getRandomValue = function (values) {
  var index = Math.floor(Math.random() * values.length);
  return values[index];
};

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
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

var pins = createPinObjects(8);

var renderPin = function (pinValues) {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pinValues.location.x + 'px; top: ' + pinValues.location.y + 'px;';
  pinElement.firstChild.src = pinValues.author.avatar;
  pinElement.firstChild.alt = pinValues.offer.type;
  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < pins.length; i++) {
  var pin = pins[i];
  fragment.appendChild(renderPin(pin));
}

mapPins.appendChild(fragment);
