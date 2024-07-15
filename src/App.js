import React from 'react';
import MiddleEllipsis2D from './components/MiddleEllipsis2D';
import AnotherMiddleEllipsis from './components/AnotherMiddleEllipsis';
import './App.css';

function App() {
  const items = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    "Fusce mattis, justo nec mollis ultricies, ipsum erat vehicula risus, eu suscipit sem libero nec erat. Aliquam erat volutpat. Integer ultrices lobortis eros ut convallis.",
    "Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
    "Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo.",
    "Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo.",
    "Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo.",
    "Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
  ];

  const item2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."

  return (
    <div className="bg-gray-100">
      <div className="p-2 bg-white">
        <div className='flex flex-col gap-2'>
          {items.map((item, index) => (
            <div key={index} className="bg-slate-200 rounded h-[170px] flex justify-center items-center">
              <div className='h-[90%] w-[90%] flex justify-center items-center'>
                <MiddleEllipsis2D text={item} />
              </div>
            </div>
          ))}
        </div>
        <div className='text-red-500 text-center text-4xl font-semibold w-full my-5'>AnotherMiddleEllipsis (disastroso)</div>
        <div className='w-[100%] h-[170px] bg-slate-200 rounded'>
          <AnotherMiddleEllipsis text={item2}></AnotherMiddleEllipsis>
        </div>
      </div>
    </div>
  );
}

export default App;
