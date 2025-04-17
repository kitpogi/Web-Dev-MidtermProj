import React from 'react';

const Borders = ({ borders, onBorderClick }) => {
  return (
    <div className="mt-8 mb-16 text-center"> 
      <h3 className="text-lg text-white font-semibold mb-2">Border Countries:</h3>
      {borders.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-2">
          {borders.map((border) => (
            <button
              key={border.name}
              onClick={() => onBorderClick(border.name)}
              className="bg-transparent border border-gray-300 hover:bg-gray-300 hover:text-white px-3 py-1 rounded text-sm text-white"
            >
              {border.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-white">No border countries</p> 
      )}
    </div>
  );
};

export default Borders;
