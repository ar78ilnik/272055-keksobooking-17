'use strict';
(function () {
  window.pins = {
    createPinObjects: function (pinsCount) {
      var TYPES = ['palace', 'flat', 'house', 'bungalo'];
      var WIDTH_LOCATION = 1200;
      var HEIGHT_LOCATION = 750;
      var types = TYPES;
      var widthLocation = WIDTH_LOCATION;
      var heightLocation = HEIGHT_LOCATION;
      var Arraypins = [];
      for (var i = 0; i < pinsCount; i++) {
        var pin = {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },
          offer: {
            type: window.utils.getRandomValue(types)
          },
          location: {
            x: (window.utils.getRandomNumber(widthLocation) + 25),
            y: window.utils.getRandomNumber(heightLocation)
          }
        };
        Arraypins.push(pin);
      }
      return Arraypins;
    },
    renderPin: function (pinValues) {
      var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinsTemplate.cloneNode(true);
      pinElement.style = 'left: ' + pinValues.location.x + 'px; top: ' + pinValues.location.y + 'px;';
      pinElement.firstChild.src = pinValues.author.avatar;
      pinElement.firstChild.alt = pinValues.offer.type;
      return pinElement;
    },
    pinAppend: function (pins) {
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        var pin = pins[i];
        fragment.appendChild(this.renderPin(pin));
      }
      mapPins.appendChild(fragment);
    }
  };
})();
