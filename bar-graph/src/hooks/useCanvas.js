import React, { useEffect, useState } from 'react';

const useCanvas = (parentDom) => {
  const [ctx, setCtx] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [canvasW, setCanvasW] = useState(0);
  const [canvasH, setCanvasH] = useState(0);

  const initCanvas = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = canvasW * pixelRatio;
    canvas.height = canvasH * pixelRatio;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;
    canvas.style.position = 'absolute';

    ctx.scale(pixelRatio, pixelRatio);
    parentDom.current.appendChild(canvas);

    setCanvas(canvas);
    setCtx(ctx);
  };

  const destroyCanvas = () => {
    if (ctx) {
      parentDom.current.removeChild(canvas);
      setCanvas(null);
      setCtx(null);
    }
  };

  const paintCanvas = (callback) => {
    if (!ctx) return;

    ctx.save();
    callback?.(ctx);
    ctx.restore();
  };

  const clearCanvas = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasW, canvasH);
  };

  const setDims = () => {
    const { width, height } = parentDom.current.getBoundingClientRect();
    setCanvasW(width);
    setCanvasH(height);
  };

  useEffect(() => {
    if (!parentDom || !parentDom.current || !canvasW || !canvasH) return;

    destroyCanvas();
    initCanvas();
  }, [canvasW, canvasH]);

  useEffect(() => {
    if (parentDom && parentDom.current) {
      setDims();
    }
  }, [parentDom]);

  useEffect(() => {
    window.addEventListener('resize', setDims);
    return () => window.removeEventListener('resize', setDims);
  }, []);

  return [paintCanvas, clearCanvas, canvasW, canvasH, ctx];
};

export default useCanvas;
