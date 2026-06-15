import React from 'react';

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
    confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-800' },
    shipped: { label: 'Shipped', className: 'bg-purple-100 text-purple-800' },
    delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;