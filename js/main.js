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

var createPins = function (pinsCount) {
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
var pins = createPins(8);

// 2. Убираем класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 3. Создание DOM-элементов

var listPins = document.querySelector('.map__pins');

for (var i = 0; i < 8; i++) {
  var pinElement = document.createElement('div');
  pinElement.style = ''
listPins.appendChild(pinElement);
}


