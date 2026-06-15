import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-300 absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;