import React from 'react';

const Flag = ({ flagUrl, altText }) => {
  return (
    <div className="flex justify-center items-center h-48 w-full rounded-lg overflow-hidden">
      <img
        src={flagUrl}
        alt={altText}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Flag;