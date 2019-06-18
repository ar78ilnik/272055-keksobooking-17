'use strict';

// 1. Создание массива объявлений
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

var createPinObjects = function (pinsCount) {
  var pins = [];
  for (var i = 0; i < pinsCount; i++) {
    var pin = {
      author: {avatar: 'img/avatars/user{{0x}}.png'},
      offer: {type: getRandomValue(TYPES)},
      location: {x: getRandomNumber(WIDTH_LOCATION), y: getRandomNumber(HEIGHT_LOCATION)}
    };
    pins.push(pin);
  }
  return pins;
};

var pins = createPinObjects(8);

// 2. Убираем класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 3. Создание DOM-элементов

var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var renderPin = function () {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.querySelector('.map__pin').style = 'left: {{location.x}}px; top: {{location.y}}px;';
  pinElement.querySelector('.map__pin').src = '{{author.avatar}}';
  pinElement.querySelector('.map__pin').alt = '{{заголовок объявления}}';
  return pinElement;
};

// 4. Отрисовка сгенерированных элементов в блок .map__pins
var fragment = document.createDocumentFragment();

for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

mapPins.appendChild(fragment);
