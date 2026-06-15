import React from 'react';
import { FiX, FiPackage, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import { formatPrice, formatDate } from '../../utils/formatters';
import OrderStatusBadge from './OrderStatusBadge';

const OrderDetailModal = ({ isOpen, onClose, order, onUpdateStatus }) => {
  if (!isOpen || !order) return null;

  const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  const handleStatusChange = (newStatus) => {
    if (window.confirm(`Change order status to ${newStatus.toUpperCase()}?`)) {
      onUpdateStatus(order.id, newStatus);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Order Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
          </div>
          
          <div className="p-6">
            {/* Order Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="text-2xl font-mono font-bold">#{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{formatDate(order.order_date)}</p>
              </div>
            </div>

            {/* Status Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FiPackage className="text-blue-600" size={20} />
                  <span className="font-medium">Order Status:</span>
                  <OrderStatusBadge status={order.order_status} />
                </div>
                <select
                  value={order.order_status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="px-3 py-1 border rounded-lg text-sm"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Customer Information */}
              <div className="card">
                <h4 className="font-semibold mb-3 flex items-center">
                  <FiUser className="mr-2" /> Customer Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {order.customer_name}</p>
                  <p><strong>Email:</strong> {order.customer_email}</p>
                  <p><strong>Phone:</strong> {order.customer_phone}</p>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="card">
                <h4 className="font-semibold mb-3 flex items-center">
                  <FiMapPin className="mr-2" /> Shipping Address
                </h4>
                <p className="text-sm whitespace-pre-wrap">{order.shipping_address}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="card mb-6">
              <h4 className="font-semibold mb-3">Order Items</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 text-sm font-medium">Product</th>
                      <th className="text-left py-2 text-sm font-medium">Size</th>
                      <th className="text-left py-2 text-sm font-medium">Color</th>
                      <th className="text-right py-2 text-sm font-medium">Price</th>
                      <th className="text-center py-2 text-sm font-medium">Qty</th>
                      <th className="text-right py-2 text-sm font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {order.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 text-sm">{item.product?.title_product || `Product #${item.product_id}`}</td>
                        <td className="py-2 text-sm">{item.selected_size}</td>
                        <td className="py-2 text-sm">{item.selected_color}</td>
                        <td className="py-2 text-sm text-right">{formatPrice(item.unit_price)}</td>
                        <td className="py-2 text-sm text-center">{item.quantity}</td>
                        <td className="py-2 text-sm text-right font-medium">{formatPrice(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t">
                    <tr>
                      <td colSpan="5" className="pt-3 text-right font-semibold">Total:</td>
                      <td className="pt-3 text-right font-bold text-blue-600">{formatPrice(order.total_amount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;