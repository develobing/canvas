/**
 * bar.js
 * simple bar chart library
 * 2022.09.17 - version 1.0
 * http://github.com/develobing
 *
 * Copyright 2022 Robin
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 */

'use strict';

function BarChart(targetId, width, height, data) {
  // Base
  var chart = this;

  // Specify configurations
  chart.configureChart(targetId, width, height, data);

  // Pre operations
  chart.performOperations();

  // Draw chart
  chart.drawChart();
}

BarChart.prototype.configureChart = function (targetId, width, height, data) {
  // Base
  var chart = this;

  // Set canvas specifications
  chart.setCanvasParameters(targetId, width, height, data);

  // Set chart specifications
  chart.setChartParameters(targetId, width, height, data);
};

BarChart.prototype.setCanvasParameters = function (
  targetId,
  width,
  height,
  data
) {
  // Base
  var chart = this;

  // Canvas specifications coming from outside
  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartParameters = function (
  targetId,
  width,
  height,
  data
) {
  // Base
  var chart = this;

  // Axis specifications
  chart.axisRatio = 10; //in terms of percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = '#b1b1b1';
  chart.axisWidth = 0.75;

  // Label Configurations
  chart.fontRatio = 3;
  chart.fontFamily = 'times';
  chart.fontStyle = 'normal';
  chart.fontWeight = '300';
  chart.fontColor = '#666';
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  // Guideline configurations
  chart.guidelineColor = '#e5e5e5';
  chart.guidelineWidth = 0.5;
};

BarChart.prototype.performOperations = function () {
  // Base
  var chart = this;

  // Create canvas
  chart.createCanvas();

  // Handle data
  chart.handleData();

  // Prepare data
  chart.prepareData();
};

BarChart.prototype.createCanvas = function () {
  // Base
  var chart = this;

  // Create canvas
  var canvas = document.createElement('canvas');
  canvas.id = `${chart.id}-${Math.random()}`;
  canvas.width = chart.width;
  canvas.height = chart.height;

  // Append canvas to target container
  var target = document.getElementById(chart.id);
  target.innerHTML = ''; // Clean the content inside the target container
  target.appendChild(canvas);

  // Add canvas to chart object
  chart.canvas = canvas;
  chart.context = canvas.getContext('2d');
};

BarChart.prototype.handleData = function () {
  // Base
  var chart = this;

  // Data sets
  chart.labels = [];
  chart.values = [];

  // Handle data
  chart.data.forEach((item) => {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.prepareData = function () {
  // Base
  var chart = this;

  // Global variables
  chart.itemsNum = chart.labels.length;
  chart.maxValue = Math.max(...chart.values);
  chart.minValue = Math.min(...chart.values);

  // Axis specifications
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin; // bottom and top margin
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin; // left and right margin

  // Label specifications
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;
};

BarChart.prototype.drawChart = function () {
  // Base
  var chart = this;

  // Vertical axis
  chart.drawVerticalAxis();

  // Vertical labels
  chart.drawVerticalLabels();

  // Horizontal axis
  chart.drawHorizontalAxis();

  // Horizontal labels
  chart.drawHorizontalLabels();

  // Horizontal guidelines
  chart.drawHorizontalGuidelines();

  // Vertical guidelines
  chart.drawVeticalGuidelines();

  // Bars
  chart.drawBars();
};

BarChart.prototype.drawVerticalAxis = function () {
  // Base
  var chart = this;

  // Data destructuring
  var {
    context,
    axisWidth,
    axisColor,
    height,
    horizontalMargin,
    verticalMargin,
  } = chart;

  // Vertical axis
  context.beginPath();
  context.lineWidth = axisWidth;
  context.strokeStyle = axisColor;
  context.moveTo(horizontalMargin, verticalMargin);
  context.lineTo(horizontalMargin, height - verticalMargin);
  context.stroke();
};

BarChart.prototype.drawVerticalLabels = function () {
  // Base
  var chart = this;

  // Data destructuring
  var {
    context,
    fontStyle,
    fontWeight,
    verticalFontSize,
    fontFamily,
    itemsNum,
    axisRatio,
    verticalUpperBound,
    verticalLabelFreq,
    verticalAxisWidth,
    verticalMargin,
    horizontalMargin,
  } = chart;

  // Text specifications
  var labelFont = `${fontStyle} ${fontWeight} ${verticalFontSize}px ${fontFamily}`;
  context.font = labelFont;
  context.textAlign = 'right';
  context.fillStyle = chart.fontColor;

  // Scale values
  var scaleVerticalLabelFreq =
    (verticalAxisWidth / verticalUpperBound) * verticalLabelFreq;

  // Draw labels
  for (var i = 0; i <= itemsNum; i++) {
    var labelText = verticalUpperBound - i * verticalLabelFreq;
    var verticalLabelX = horizontalMargin - horizontalMargin / axisRatio;
    var verticalLabelY = verticalMargin + i * scaleVerticalLabelFreq;

    context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
};

BarChart.prototype.drawHorizontalAxis = function () {
  // Base
  var chart = this;

  // Data destructuring
  var {
    context,
    width,
    height,
    axisWidth,
    axisColor,
    height,
    horizontalMargin,
    verticalMargin,
  } = chart;

  // Horizontal axis
  context.beginPath();
  context.lineWidth = axisWidth;
  context.strokeStyle = axisColor;
  context.moveTo(horizontalMargin, height - verticalMargin);
  context.lineTo(width - horizontalMargin, height - verticalMargin);
  context.stroke();
};

BarChart.prototype.drawHorizontalLabels = function () {
  // Base
  var chart = this;

  // Data destructuring
  var {
    context,
    labels,
    height,
    fontStyle,
    fontWeight,
    verticalFontSize,
    fontFamily,
    itemsNum,
    axisRatio,
    verticalMargin,
    horizontalMargin,
    horizontalLabelFreq,
  } = chart;

  // Text specifications
  var labelFont = `${fontStyle} ${fontWeight} ${verticalFontSize}px ${fontFamily}`;
  context.font = labelFont;
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillStyle = chart.fontColor;

  // Draw labels
  for (var i = 0; i < itemsNum; i++) {
    var horizontalLabelX =
      horizontalMargin + i * horizontalLabelFreq + horizontalLabelFreq / 2;
    var horizontalLabelY = height - verticalMargin + verticalMargin / axisRatio;

    context.fillText(labels[i], horizontalLabelX, horizontalLabelY);
  }
};

BarChart.prototype.drawHorizontalGuidelines = function () {
  // Base
  var chart = this;

  // Data destructuring
  var {
    context,
    itemsNum,
    verticalUpperBound,
    verticalLabelFreq,
    verticalAxisWidth,
    verticalMargin,
    horizontalAxisWidth,
    horizontalMargin,
    guidelineWidth,
    guidelineColor,
  } = chart;

  // Specifications
  context.lineWidth = guidelineWidth;
  context.strokeStyle = guidelineColor;

  // Scale values
  var scaleVerticalLabelFreq =
    (verticalAxisWidth / verticalUpperBound) * verticalLabelFreq;

  // Draw labels
  for (var i = 0; i <= itemsNum; i++) {
    // Starting point coordinates
    var horizontalGuidelineStartX = horizontalMargin;
    var horizontalGuidelineStartY = verticalMargin + i * scaleVerticalLabelFreq;

    // End point coordinates
    var horizontalGuidelineEndX = horizontalMargin + horizontalAxisWidth;
    var horizontalGuidelineEndY = verticalMargin + i * scaleVerticalLabelFreq;

    // Draw guidelines
    context.beginPath();
    context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
    context.stroke();
  }
};

BarChart.prototype.drawVeticalGuidelines = function () {
  // Base
  var chart = this;

  // Data destructuring
  var {
    context,
    height,
    fontStyle,
    fontWeight,
    verticalFontSize,
    fontFamily,
    itemsNum,
    verticalMargin,
    horizontalMargin,
    horizontalLabelFreq,
    guidelineWidth,
    guidelineColor,
  } = chart;

  // Specifications
  context.lineWidth = guidelineWidth;
  context.strokeStyle = guidelineColor;

  // Text specifications
  var labelFont = `${fontStyle} ${fontWeight} ${verticalFontSize}px ${fontFamily}`;
  context.font = labelFont;
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillStyle = chart.fontColor;

  // Draw labels
  for (var i = 0; i <= itemsNum; i++) {
    // Starting point coordinates
    var verticalGuidelineStartX = horizontalMargin + i * horizontalLabelFreq;
    var verticalGuidelineStartY = height - verticalMargin;

    // End point coordinates
    var verticalGuidelineEndX = horizontalMargin + i * horizontalLabelFreq;
    var verticalGuidelineEndY = verticalMargin;

    // Draw guidelines
    context.beginPath();
    context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
    context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
    context.stroke();
  }
};

BarChart.prototype.drawBars = function () {
  // Base
  var chart = this;

  // Data destructuring
  var {
    context,
    itemsNum,
    values,
    height,
    axisRatio,
    verticalAxisWidth,
    verticalMargin,
    horizontalMargin,
    horizontalLabelFreq,
    barWidth,
    maxValue,
    createRandomRGBColor,
  } = chart;

  for (var i = 0; i < itemsNum; i++) {
    context.beginPath();
    var color = createRandomRGBColor();
    var fillOpacity = '0.5';
    var fillColor = `rgba(${color}, ${fillOpacity})`;
    var borderColor = `rgb(${color})`;

    var barX =
      horizontalMargin +
      i * horizontalLabelFreq +
      horizontalLabelFreq / axisRatio;
    var barY = height - verticalMargin;
    var barWidth = horizontalLabelFreq - (2 * horizontalLabelFreq) / axisRatio;
    var barHeight = (-1 * verticalAxisWidth * values[i]) / maxValue;

    context.fillStyle = fillColor;
    context.strokeStyle = borderColor;
    context.rect(barX, barY, barWidth, barHeight);
    context.fill();
    context.stroke();
  }
};

BarChart.prototype.createRandomRGBColor = function () {
  var red = getRandomInt(0, 257);
  var green = getRandomInt(0, 257);
  var blue = getRandomInt(0, 257);

  return `${red}, ${green}, ${blue}`;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
