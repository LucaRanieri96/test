import React, { useRef, useState, useEffect } from 'react';

function MiddleEllipsis({ text }) {
  const containerRef = useRef(null);
  const [maxLength, setMaxLength] = useState(text.length);

  useEffect(() => {
    // funzione che aggiorna il maxLenght per il testo
    const updateMaxLength = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement.offsetWidth;
        const parentHeight = containerRef.current.parentElement.offsetHeight;
        const charWidth = 10;
        const lineHeight = 21;

        const maxCharsPerLine = Math.floor(parentWidth / charWidth);
        const maxLines = Math.floor(parentHeight / lineHeight);
        const newMaxLength = maxCharsPerLine * maxLines;

        setMaxLength(newMaxLength);
      }
    };
    // richiamo la funzione
    updateMaxLength();
    const resizeObserver = new ResizeObserver(updateMaxLength);

    if (containerRef.current && containerRef.current.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      if (containerRef.current && containerRef.current.parentElement) {
        resizeObserver.unobserve(containerRef.current.parentElement);
      }
    };
  }, []);

  if (text.length <= maxLength) {
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
    "Eiusmod elit laborum commodo aute nisi velit sunt enim occaecat ad sunt enim occaecat ad sunt enim occaecat ad ah ah ah ah id te eiusmod commodo fugiat laborum. Exercitation consequat minim est amet occaecat eu ad aute magna cupidatat duis qui labore noa a a a a an a A A A A A. a a a a a a a a a a a a a a a a a a a a a a a a a a a a",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ];

  return (
    <>
      <div className='flex flex-col gap-2'>
        {items.map((item) => (
          <div key={item.substring(0, 10)} className="bg-slate-200 rounded h-[165px]">
            <div className="flex justify-start h-full p-2">
              <MiddleEllipsis text={item} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MiddleTruncate;
