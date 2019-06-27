'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var WIDTH_LOCATION = 1200;
var HEIGHT_LOCATION = 750;

var getRandomValue = function (values) {
  var index = Math.floor(Math.random() * values.length);
  return values[index];
};

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

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

var mapPin = document.querySelectorAll('.map__pin');
for (i = 1; i < mapPin.length; i++) {
  mapPin[i].style.display = 'none';
}

var form = document.querySelector('.ad-form');
var fieldSets = form.getElementsByTagName('fieldset');
for (i = 0; i < fieldSets.length; i++) {
  fieldSets[i].setAttribute('disabled', 'disabled');
}

var pinMain = document.querySelector('.map__pin--main');
pinMain.addEventListener('click', function () {
  for (i = 1; i < mapPin.length; i++) {
    mapPin[i].style.display = 'block';
  }
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  mapFilters.setAttribute('disabled', 'disabled');
  for (i = 0; i < fieldSets.length; i++) {
    fieldSets[i].removeAttribute('disabled');
  }
});

