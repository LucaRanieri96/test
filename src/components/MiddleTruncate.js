import React, { useRef, useState, useEffect } from 'react';

function MiddleEllipsis({ text }) {
  const containerRef = useRef(null);
  const [maxLength, setMaxLength] = useState(0);
  const [charWidth, setCharWidth] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (!text) return; // Evita di calcolare se il testo è vuoto

    const calculateTextMetrics = () => {
      if (containerRef.current) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          // Ottieni lo stile del font dal contenitore
          const computedStyle = getComputedStyle(containerRef.current);
          const font = computedStyle.font || computedStyle.fontSize + ' ' + computedStyle.fontFamily;
          context.font = font;

          // Calcola larghezza media dei caratteri
          const averageCharWidth = context.measureText('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').width / 52;
          setCharWidth(averageCharWidth);

          // Calcola altezza della riga
          const lineHeights = parseFloat(computedStyle.lineHeight || computedStyle.fontSize);
          setLineHeight(lineHeights);

          // Calcola lunghezza massima iniziale
          const parentWidth = containerRef.current.parentElement.offsetWidth;
          const parentHeight = containerRef.current.parentElement.offsetHeight;
          const maxCharsPerLine = Math.floor(parentWidth / charWidth);
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
  }, [text]);

  if (!text || text.length <= maxLength) {
    return <div ref={containerRef}>{text}</div>;
  }

  const startLength = Math.ceil(maxLength / 2);
  const endLength = Math.floor(maxLength / 2);
  const start = text.substring(0, startLength);
  const end = text.substring(text.length - endLength);

  return (
    <div ref={containerRef}>
      {start}...{end}
    </div>
  );
}

function MiddleTruncate() {
  const items = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    "Fusce mattis, justo nec mollis ultricies, ipsum erat vehicula risus, eu suscipit sem libero nec erat. Aliquam erat volutpat. Integer ultrices lobortis eros ut convallis.",
    "Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
    "Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo.",
  ];

  return (
    <div className='flex flex-col gap-2'>
      {items.map((item, index) => (
        <div key={index} className="bg-slate-200 rounded h-[168px]">
          <div className='p-2 h-full w-full'>
            <div className="flex justify-start h-full w-full">
              <MiddleEllipsis text={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MiddleTruncate;
