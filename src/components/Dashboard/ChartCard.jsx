import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const ChartCard = ({ title, children, change, trend, isLoading = false }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {change && (
          <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <FiTrendingUp size={16} /> : <FiTrendingDown size={16} />}
            <span className="ml-1">{change}</span>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="bg-gray-200 rounded w-full h-48"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ChartCard;