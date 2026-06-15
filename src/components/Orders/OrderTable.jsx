import React from 'react';
import { FiEye } from 'react-icons/fi';
import { formatPrice, formatDate } from '../../utils/formatters';
import OrderStatusBadge from './OrderStatusBadge';

const OrderTable = ({ orders, onView }) => {
  if (orders.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Order ID</th>
              <th className="table-header">Customer</th>
              <th className="table-header">Date</th>
              <th className="table-header">Total</th>
              <th className="table-header">Status</th>
              <th className="table-header text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="table-cell font-mono font-medium">
                  #{order.id}
                </td>
                <td className="table-cell">
                  <div>
                    <div className="font-medium">{order.customer_name}</div>
                    <div className="text-xs text-gray-500">{order.customer_email}</div>
                  </div>
                </td>
                <td className="table-cell">
                  {formatDate(order.order_date)}
                </td>
                <td className="table-cell font-medium">
                  {formatPrice(order.total_amount)}
                </td>
                <td className="table-cell">
                  <OrderStatusBadge status={order.order_status} />
                </td>
                <td className="table-cell">
                  <div className="flex justify-center">
                    <button
                      onClick={() => onView(order)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;