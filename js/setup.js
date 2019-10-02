'use strict';

var numberWizard = 4;

var userDialog = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var createWizard = function (value) {
  var wizard = [];

  for (var i = 0; i < value; i++) {
    var nameWizard = getRandomElement(WIZARD_NAME);
    var surnameWizard = getRandomElement(WIZARD_SURNAME);
    var colorCoat = getRandomElement(COAT_COLOR);
    var colorEyes = getRandomElement(EYES_COLOR);

    wizard.push({
      name: WIZARD_NAME[nameWizard] + ' ' + WIZARD_SURNAME[surnameWizard],
      coatColor: COAT_COLOR[colorCoat],
      eyesColor: EYES_COLOR[colorEyes]
    });
  }

  return wizard;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = createWizard(numberWizard);


var createFragment = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

createFragment(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Работа с событиями

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    openPopup();
  }
});

setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
  evt.preventDefault();

  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomColor = function (color) {
  var randomColor = color[getRandomElement(color)];
  return randomColor;
};

var setupWizardAppearance = document.querySelector('.setup-wizard-appearance');
var wizardColorCoat = setupWizardAppearance.querySelector('.wizard-coat');
var wizardColorEyes = setupWizardAppearance.querySelector('.wizard-eyes');
var fireballColor = document.querySelector('.setup-fireball-wrap');

wizardColorCoat.addEventListener('click', function (evt) {
  evt.preventDefault();

  var randomCoat = getRandomColor(WIZARD_COAT);

  wizardColorCoat.style.fill = randomCoat;
  setupWizardAppearance.querySelector('.input-coat').value = randomCoat;
});

wizardColorEyes.addEventListener('click', function (evt) {
  evt.preventDefault();

  var randomEyes = getRandomColor(WIZARD_EYES);

  wizardColorEyes.style.fill = randomEyes;
  setupWizardAppearance.querySelector('.input-eyes').value = randomEyes;
});

fireballColor.addEventListener('click', function (evt) {
  evt.preventDefault();

  var randomFireball = getRandomColor(WIZARD_FIREBALL);

  fireballColor.style.background = randomFireball;
  fireballColor.querySelector('.input-fireball').value = randomFireball;
});
