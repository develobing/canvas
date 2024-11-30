const K = 1000;
const M = K * K;
const B = M * K;

export const getGraphString = (data) => {
  // Get last month sales and month
  const lastMonthIndex = data.length - 1;
  const lastMonthSales = data[lastMonthIndex].sales;
  const lastMonth = data[lastMonthIndex].month + ' ' + new Date().getFullYear();

  // Calculate delta
  const deltaSales =
    data[lastMonthIndex].sales - data[lastMonthIndex - 1].sales;
  const deltaPrefix = deltaSales > 0 ? 'Up by' : 'Down by';
  const delta = { prefix: deltaPrefix, sales: humanize(deltaSales) };

  return { lastMonthSales: humanize(lastMonthSales), lastMonth, delta };
};

export const humanize = (value) => {
  const sign = value > 0 ? '' : '-';
  const abs = Math.abs(value);

  switch (true) {
    case abs >= B:
      return sign + (abs / B).toFixed(1) + 'B';
    case abs >= M:
      return sign + (abs / M).toFixed(1) + 'M';
    case abs >= K:
      return sign + (abs / K).toFixed(1) + 'K';
    default:
      return sign + abs.toFixed(1);
  }
};

export const norm = (value, min, max) => {
  return (value - min) / (max - min);
};

export const lerp = (norm, min, max) => {
  return (max - min) * norm + min;
};

// mapping a value of range minA-maxA to minB-maxB
export const map = (value, minA, maxA, minB, maxB) => {
  const n = norm(value, minA, maxA);
  const l = lerp(n, minB, maxB);
  return l;
};
