import React from 'react';

const Borders = ({ borders, onBorderClick }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg text-white font-semibold mb-2">Border Countries:</h3>
      {borders.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {borders.map((border) => (
            <button
              key={border.name}
              onClick={() => onBorderClick(border.name)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
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