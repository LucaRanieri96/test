import React, { useEffect, useRef } from 'react';
import './style.css';

const AnotherMiddleEllipsis = ({ text }) => {
  const containerRef = useRef(null);
  const [displayText, setDisplayText] = React.useState(text);

  useEffect(() => {
    function cropMiddle(target, text) {
      let inputFontStyle, ellipsisWidth, maxWidth, maxHeight, cutPoint;

      // select target, set value
      target.innerText = text;
      inputFontStyle = window.getComputedStyle(target, null).getPropertyValue('font');

      // calculate max width together with ellipsis
      ellipsisWidth = getTextWidth('...', inputFontStyle);
      maxWidth = target.clientWidth - ellipsisWidth;
      maxHeight = target.clientHeight;

      // calculate height of one line of text
      const lineHeight = getLineHeight(inputFontStyle);
      const maxLines = Math.floor(maxHeight / lineHeight);

      function sliceIfNotFitting() {
        const textWidth = getTextWidth(text, inputFontStyle);
        const textHeight = getTextHeight(text, inputFontStyle, maxWidth);

        if (textWidth > maxWidth || textHeight > maxHeight) {
          cutPoint = Math.round(text.length / 2);
          text = text.slice(0, cutPoint - 1) + text.slice(cutPoint);
          sliceIfNotFitting();
        } else {
          if (cutPoint < text.length) {
            const middle = Math.floor(text.length / 2);
            setDisplayText(text.slice(0, middle) + '...' + text.slice(middle));
          } else {
            setDisplayText(text);
          }
        }
      }

      function getTextWidth(text, font) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
      }

      function getTextHeight(text, font, maxWidth) {
        const canvas = getTextHeight.canvas || (getTextHeight.canvas = document.createElement('canvas'));
        const context = canvas.getContext('2d');
        context.font = font;

        const words = text.split(' ');
        let line = '';
        let lineCount = 0;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            line = words[n] + ' ';
            lineCount++;
          } else {
            line = testLine;
          }
        }
        lineCount++; // count the last line

        return lineCount * getLineHeight(font);
      }

      function getLineHeight(font) {
        const canvas = getLineHeight.canvas || (getLineHeight.canvas = document.createElement('canvas'));
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText('M'); // Use a typical capital letter
        return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      }

      sliceIfNotFitting();
    }

    if (containerRef.current) {
      cropMiddle(containerRef.current, text);
    }
  }, [text]);

  return <div ref={containerRef} className="ellipsis-container">{displayText}</div>;
};

export default AnotherMiddleEllipsis;
