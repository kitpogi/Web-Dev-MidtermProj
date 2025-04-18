import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
      <p>Loading country data...</p>
    </div>
  );
};

export default LoadingSpinner;
