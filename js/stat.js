'use strict';

// 3. УЧЕБНЫЙ ПРОЕКТ: ХОЛСТ

var CLOUD_WIDTH = 420;                  // Ширина облака
var CLOUD_HEIGHT = 270;                 // Высота облака
var CLOUD_X = 100;                      // Отступ облака по X
var CLOUD_Y = 10;                       // Отступ облака по Y
var CLOUD_COLOR = '#fff'                // Цвет облака
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)' // Цвет тени облака
var GAP = 10;                           // Отступ
var TEXT_X = 130;                       // Отступ текста по X
var TEXT_Y = 40;                        // Отступ текста по Y
var TEXT_NAME_Y = 250;                  // Отступ имён по Y
var TEXT_COLOR = '#000'                 // Цвет текста
var BAR_WIDTH = 40;                     // Ширина гистограммы
var BAR_HEIGHT = 150;                   // Высота гистограммы 
var BAR_GAP = 50;                       // Отступ между гистаграммами
var BAR_X = BAR_WIDTH + BAR_GAP;        // Отступ гистаграммы по X
var BAR_Y = 240;                        // Отсутп гистограммы по Y

// Отрисовка облака
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW); // Тень облака статистики
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR); // Облако статистики

  ctx.font = '16px PT Mono';
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', TEXT_X - GAP, TEXT_Y - GAP);
  ctx.fillText('Cписок результатов:', TEXT_X - GAP, TEXT_Y + GAP);

  // Поиск максимального времени
  var getMaxTime = function() {
    return Math.max(...times);
  };

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], TEXT_X + GAP + BAR_X * i, TEXT_NAME_Y); // Имя игрока

    // Цвет гистаргаммы
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(210, ' + Math.floor(Math.random() * 101) + '%, 50%)';
    }

    var barHeight = (-BAR_HEIGHT * times[i]) / getMaxTime(); // Расчет высоты гистограммы

    ctx.fillRect(CLOUD_X + BAR_GAP - GAP + BAR_X * i, BAR_Y, BAR_WIDTH, barHeight); // Высота гистограммы

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), TEXT_X + GAP + BAR_X * i, barHeight + (CLOUD_HEIGHT - BAR_GAP)); // Время игрока
  };
};