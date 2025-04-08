import React from 'react';

const Flag = ({ flagUrl, altText }) => {
  return (
    <img 
      src={flagUrl} 
      alt={altText} 
      className="h-auto mx-auto" // Ensures the image is centered horizontally
      width="300" 
    />
  );
};

export default Flag;
