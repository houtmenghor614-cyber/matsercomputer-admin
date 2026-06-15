import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../services';
import { formatPrice, formatDate } from '../../utils/formatters';
import OrderStatusBadge from '../Orders/OrderStatusBadge';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const data = await orderService.getAll({ limit: 5 });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-sm font-medium text-gray-600">Order ID</th>
            <th className="text-left py-2 text-sm font-medium text-gray-600">Customer</th>
            <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
            <th className="text-left py-2 text-sm font-medium text-gray-600">Total</th>
            <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-2 text-sm">
                <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline font-mono">
                  #{order.id}
                </Link>
              </td>
              <td className="py-2 text-sm">{order.customer_name}</td>
              <td className="py-2 text-sm">{formatDate(order.order_date)}</td>
              <td className="py-2 text-sm font-medium">{formatPrice(order.total_amount)}</td>
              <td className="py-2">
                <OrderStatusBadge status={order.order_status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <div className="text-center py-4 text-gray-500">No orders found</div>
      )}
    </div>
  );
};

export default RecentOrders;