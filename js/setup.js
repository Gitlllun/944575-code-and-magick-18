'use strict';

var numberWizard = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

var fragment = document.createDocumentFragment();

var createFragment = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

createFragment(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
