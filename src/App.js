import React, { useState } from 'react';
import './App.css';
//componente da libreria esterna per troncare il testo nel mezzo (funziona solo single line)
import MiddleEllipsis from "react-middle-ellipsis";
import MiddleTruncate from './components/MiddleTruncate.js';


function App() {
  //array items della lista
  const items = [
    "Eiusmod elit laborum commodo aute nisi velit sunt enim occaecat ad eiusmod qui. Id sint est aute eiusmod commodo fugiat laborum. Exercitation consequat minim est amet occaecat eu ad aute magna cupidatat duis qui labore non.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ];
  //array badges della lista
  const badges = [
    { id: 1, label: "BadgeH1C5SETTE", tooltip: "Tooltip per Badge 1" },
    { id: 2, label: "Custom", tooltip: "Tooltip per Badge 2" },
    { id: 3, label: "Ciccia", tooltip: "Tooltip per Badge 3" }
  ];
  // tooltipContents è uno stato che tiene traccia del contenuto del tooltip per ciascun elemento in items. È inizializzato con un array di stringhe vuote della stessa lunghezza di items.
  const [tooltipContents, setTooltipContents] = useState(Array(items.length).fill(''));
  // showTooltip aggiorna tooltipContents per mostrare il tooltip all'indice specificato con il contenuto specificato.
  const showTooltip = (index, content) => {
    const newTooltipContents = [...tooltipContents];
    newTooltipContents[index] = content;
    setTooltipContents(newTooltipContents);
  };
  //hideTooltip rimuove il contenuto del tooltip all'indice specificato impostandolo su una stringa vuota.
  const hideTooltip = (index) => {
    const newTooltipContents = [...tooltipContents];
    newTooltipContents[index] = '';
    setTooltipContents(newTooltipContents);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 p-8 bg-white"><MiddleTruncate></MiddleTruncate></div>
      <div className="w-2/3 p-8 bg-white rounded-lg shadow-lg">
        <h1 style={{ width: "100%", whiteSpace: "nowrap" }} className="text-4xl font-bold text-blue-500 mb-5 text-center"> <MiddleEllipsis><span>Testing React Middle Ellipsis </span></MiddleEllipsis></h1>

        {/* Lista di elementi */}
        {items.map((item, index) => (
          // crea un id unico per ogni elemento della lista
          <div key={item.substring(0, 10)} className="pb-1 bg-white flex gap-5 relative">
            {/* Badge associato all'elemento */}
            <div key={`badge-${badges[index % badges.length].id}`} style={{ width: "10%", whiteSpace: "nowrap" }} className="bg-red-300 text-white truncate rounded-md justify-center p-1 min-w-10 cursor-pointer"
              onMouseEnter={() => showTooltip(index, badges[index % badges.length].tooltip)}
              onMouseLeave={() => hideTooltip(index)}
            >
              {badges[index % badges.length].label}
            </div>

            {/* Testo con ellissi */}
            <div style={{ width: "90%", whiteSpace: "nowrap" }} className="flex items-center justify-start">
              <MiddleEllipsis>
                <span onMouseEnter={() => showTooltip(index, item)} onMouseLeave={() => hideTooltip(index)}>{item}</span>
              </MiddleEllipsis>
            </div>

            {/* Tooltip */}
            {tooltipContents[index] && (
              <div className="absolute bottom-10 z-10 bg-gray-800 text-white px-3 py-1 rounded-md shadow-md">
                {tooltipContents[index]}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
