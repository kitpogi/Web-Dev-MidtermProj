import React from 'react';

const Flag = ({ flagUrl, altText }) => {
  return (
    <div className="flag-container">
      <img 
        src={flagUrl} 
        alt={altText}
        className="country-flag"
      />
    </div>  
  );
};

export default Flag;