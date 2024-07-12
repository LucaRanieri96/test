import React, { useRef, useState, useEffect } from 'react';

function MiddleEllipsis2D({ text }) {
  const containerRef = useRef(null);
  const [maxLength, setMaxLength] = useState(0);
  const [charWidth, setCharWidth] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (!text) return;

    const calculateTextMetrics = () => {
      if (containerRef.current) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          const computedStyle = getComputedStyle(containerRef.current);
          const font = computedStyle.font || computedStyle.fontSize + ' ' + computedStyle.fontFamily;
          context.font = font;

          const averageCharWidth = context.measureText('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').width / 52;
          setCharWidth(averageCharWidth);

          const lineHeights = parseFloat(computedStyle.lineHeight || computedStyle.fontSize);
          setLineHeight(lineHeights);

          const parentWidth = containerRef.current.parentElement.offsetWidth;
          const parentHeight = containerRef.current.parentElement.offsetHeight;

          const paddingLeft = parseFloat(computedStyle.paddingLeft);
          const paddingRight = parseFloat(computedStyle.paddingRight);
          const availableWidth = parentWidth - (paddingLeft + paddingRight);

          const maxCharsPerLine = Math.floor(availableWidth / averageCharWidth);
          const maxLines = Math.floor(parentHeight / lineHeight);
          const newMaxLength = maxCharsPerLine * maxLines;
          setMaxLength(newMaxLength);
        }
      }
    };

    calculateTextMetrics();

    const resizeObserver = new ResizeObserver(() => {
      calculateTextMetrics();
    });

    if (containerRef.current && containerRef.current.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      if (containerRef.current && containerRef.current.parentElement) {
        resizeObserver.unobserve(containerRef.current.parentElement);
      }
    };
  }, [text, charWidth, lineHeight]);

  if (!text || text.length <= maxLength) {
    return (
      <div ref={containerRef} style={{ overflow: 'hidden' }}>
        {text}
      </div>
    );
  }

  const startLength = Math.ceil(maxLength / 2);
  const endLength = Math.floor(maxLength / 2);
  const start = text.substring(0, startLength);
  const end = text.substring(text.length - endLength);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      {start}...{end}
    </div>
  );
}

export default MiddleEllipsis2D;

