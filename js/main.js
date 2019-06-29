'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var WIDTH_LOCATION = 1200;
var HEIGHT_LOCATION = 750;

var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fieldsets = document.querySelectorAll('[name="fieldset"]');
var pinMain = document.querySelector('.map__pin--main');
var addres = document.querySelector('#address');
var form = document.querySelector('.ad-form');
var mapPoint = document.querySelector('.map');

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

var formEnable = function () {
  form.classList.remove('ad-form--disabled');
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

var addressToInput = function (coords) {
  addres.value = coords.offsetLeft + ', ' + coords.offsetTop;
};

var enableMap = function () {
  mapPoint.classList.remove('map--faded');
};

pinMain.addEventListener('click', function () {
  formEnable();
  var pins = createPinObjects(8);
  pinAppend(pins);
  assignFieldsetAttribute(fieldsets);
  addressToInput(pinMain);
  enableMap();
});

disableFieldsetAttribute(fieldsets);

