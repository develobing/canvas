import React, { useState, useEffect } from 'react';
import { map } from '../utils/utils';

const useData = (data, xKey, yKey, dims) => {
  const [graphData, setGraphData] = useState([]);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);

  const getYRange = () => {
    const range = data.reduce(
      (acc, point) => {
        return {
          min: Math.min(acc.min, point[yKey]),
          max: Math.max(acc.max, point[yKey]),
        };
      },
      { min: 0, max: 0 }
    );

    return range;
  };

  // the input data follows cartesian coordinates system
  // but the canvas coordinate system is different
  // i.e. y axis is flipped
  // setData converts and transposes the data accordingly
  const setData = () => {
    const { min, max } = getYRange();

    const mappedData = data.map((dataPoints, index) => {
      return {
        x: map(
          index,
          0,
          data.length - 1,
          dims.padding * 2,
          dims.canvasW - dims.padding * 2
        ),
        y: map(
          dataPoints[yKey],
          min,
          max,
          dims.padding,
          dims.canvasH - dims.padding
        ),
        xLegends: dataPoints[xKey],
        yLegends: dataPoints[yKey],
      };
    });

    // flip y axis
    const flippedData = mappedData.map((point) => ({
      ...point,
      y: dims.canvasH - point.y,
    }));

    setGraphData(flippedData);
    setMinY(min);
    setMaxY(max);
  };

  useEffect(() => {
    if (dims.canvasW && dims.canvasH) {
      setData();
    }
  }, [data, dims]);

  return { graphData, minY, maxY };
};

export default useData;
