onload = () => {
  var min = 1,
    max = 200;
  var data = [
    { label: 'Jan', value: getRandomInt(min, max) },
    { label: 'Feb', value: getRandomInt(min, max) },
    { label: 'March', value: getRandomInt(min, max) },
    { label: 'April', value: getRandomInt(min, max) },
    { label: 'May', value: getRandomInt(min, max) },
  ];

  // Chart specifications
  var targetId = 'chart';
  var chartWidth = 600;
  var chartHeight = 450;

  // Create Chart
  var chart = new BarChart(targetId, chartWidth, chartHeight, data);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
