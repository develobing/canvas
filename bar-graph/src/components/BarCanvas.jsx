import React, { useEffect, useRef, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import useCanvas from '../hooks/useCanvas';
import { humanize, map } from '../utils/utils';
import useData from '../hooks/useData';
import Tween from '../utils/Tween';

const CanvasWrapper = styled.div`
  box-sizing: border-box;
  margin: 21px 0;
  width: 100%;
  height: 350px;
  position: relative;
`;

const Opacity100 = 'FF';
const Opacity25 = '40';

const BarCanvas = withTheme(({ data, xKey, yKey, theme }) => {
  const canvasWrapperRef = useRef(null);

  const [bgCanvasPaint, clearBgCanvas] = useCanvas(canvasWrapperRef);
  const [
    barCanvasPaint,
    clearBarCanvas,
    barCanvasW,
    barCanvasH,
    barCanvasContext,
  ] = useCanvas(canvasWrapperRef);

  const [dims, setDims] = useState({
    padding: 40,
    offset: 10,
  });
  const { graphData, minY, maxY } = useData(data, xKey, yKey, dims);

  const _drawLine = (ctx, { x, y, width, height }) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(width, height);
    ctx.stroke();
  };

  const _drawCoordsPlane = () => {
    bgCanvasPaint((ctx) => {
      // set border colors
      ctx.strokeStyle = theme.colors['gray-2'];
      ctx.lineWidth = dims.borderWidth;

      // draw y axis
      _drawLine(ctx, {
        x: dims.left,
        y: dims.top,
        width: dims.left,
        height: dims.bottom,
      });
      // draw x axis
      _drawLine(ctx, {
        x: dims.left,
        y: dims.bottom,
        width: dims.right,
        height: dims.bottom,
      });
    });
  };

  const _drawYLegends = () => {
    bgCanvasPaint((ctx) => {
      ctx.fillStyle = theme.colors['gray-2'];
      ctx.strokeStyle = theme.colors['gray-1'];
      ctx.lineWidth = dims.borderWidth / 2;
      ctx.font = '400 12px Roboto';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // constant interval no matter what is the size of the canvas
      const interval = 5;
      const intervalHeight = (dims.canvasH - dims.padding) / interval;

      for (let i = 1; i < interval; i++) {
        // draw y grid
        // y varies for each cycle, starting from the bottom
        _drawLine(ctx, {
          x: dims.left,
          y: dims.bottom - i * intervalHeight,
          width: dims.right,
          height: dims.bottom - i * intervalHeight,
        });

        // draw y axis legend
        const yIntervalLegend = map(i, 0, interval, minY, maxY);
        const intervalYPoint = map(i, 0, interval, dims.bottom, dims.top);

        ctx.fillText(
          humanize(yIntervalLegend),
          dims.left - dims.offset / 2,
          intervalYPoint
        );
      }
    });
  };

  const _drawXLegends = () => {
    bgCanvasPaint((ctx) => {
      ctx.fillStyle = theme.colors['gray-2'];
      ctx.font = '400 12px Roboto';
      ctx.textAlign = 'center';

      graphData.forEach((point) => {
        ctx.fillText(point.xLegends, point.x, dims.bottom + dims.offset * 2);
      });
    });
  };

  const _drawBar = (ctx, { x, y, width, height }, opacity = Opacity100) => {
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, theme.colors['blue'] + opacity);
    gradient.addColorStop(1, theme.colors['teal'] + opacity);
    ctx.lineWidth = dims.barWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = gradient;

    // draw line
    _drawLine(ctx, { x, y, width, height });

    // clear the round bottom
    ctx.clearRect(
      width - dims.barWidth / 2,
      height + 1,
      dims.barWidth,
      dims.barWidth / 2
    );
  };

  const _animateBars = () => {
    const tween = new Tween();

    graphData.forEach((point) => {
      const draw = (newVal) => {
        _drawBar(barCanvasContext, {
          x: point.x,
          y: newVal,
          width: point.x,
          height: dims.bottom,
        });
      };
      tween.play(dims.bottom, point.y, 700, draw);
    });
  };

  const _isMouseOverBar = (mouseX, mouseY, { left, right, top, bottom }) => {
    return mouseX > left && mouseX < right && mouseY > top && mouseY < bottom;
  };

  const _showHoverData = (event) => {
    barCanvasPaint((ctx) => {
      clearBarCanvas();

      ctx.fillStyle = theme.colors['foreground'];
      ctx.font = '400 12px Roboto';
      ctx.textAlign = 'center';

      let hoveredBar = null;

      // check if mouse is hovering over a bar
      for (let i = 0; i < graphData.length; i++) {
        const point = graphData[i];
        const bar = {
          left: point.x - dims.barWidth / 2,
          right: point.x + dims.barWidth / 2,
          top: point.y - dims.barWidth / 2,
          bottom: dims.bottom,
        };
        const mouseOverBar = _isMouseOverBar(event.offsetX, event.offsetY, bar);

        if (mouseOverBar) {
          hoveredBar = point;
          break;
        }
      }

      // render bar as per hover
      graphData.forEach((point) => {
        const barInfo = {
          x: point.x,
          y: point.y,
          width: point.x,
          height: dims.bottom,
        };

        if (hoveredBar) {
          if (point.x === hoveredBar?.x && point.y === hoveredBar?.y) {
            _drawBar(ctx, barInfo, Opacity100);
            ctx.fillText(
              humanize(point.yLegends),
              point.x,
              point.y - dims.offset
            );
          } else {
            _drawBar(ctx, barInfo, Opacity25);
          }
        } else {
          _drawBar(ctx, barInfo, Opacity100);
        }
      });
    });
  };

  const render = () => {
    if (barCanvasContext) {
      // Draw background
      clearBgCanvas();
      _drawCoordsPlane();
      _drawYLegends();
      _drawXLegends();

      // Draw bars
      clearBarCanvas();
      // _plotBars();
      _animateBars();
    }
  };

  useEffect(() => {
    setDims({
      ...dims,
      canvasW: barCanvasW,
      canvasH: barCanvasH,
      left: dims.padding,
      right: barCanvasW - dims.padding,
      top: dims.padding,
      bottom: barCanvasH - dims.padding,
      borderWidth: 1,
      barWidth: 16,
    });
  }, [barCanvasW, barCanvasH]);

  useEffect(() => {
    if (barCanvasContext && graphData.length) {
      render();
      barCanvasContext?.canvas?.addEventListener('mousemove', _showHoverData);

      return () =>
        barCanvasContext?.canvas?.removeEventListener(
          'mousemove',
          _showHoverData
        );
    }
  }, [barCanvasContext, barCanvasW, barCanvasH, graphData]);

  return <CanvasWrapper ref={canvasWrapperRef} />;
});

export default BarCanvas;
