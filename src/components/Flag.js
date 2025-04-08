
import React from 'react';

const Flag = ({ flagUrl, altText }) => {
  return <img src={flagUrl} alt={altText} className="img-fluid" width="300" />;
};

export default Flag;
