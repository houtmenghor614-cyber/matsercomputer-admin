import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { formatPrice } from '../../utils/formatters';
import { getImageUrl } from '../../services/api';

const ProductTable = ({ products, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (products.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">IMAGE</th>
              <th className="table-header">PRODUCT NAME</th>
              <th className="table-header">CATEGORY</th>
              <th className="table-header">PRICE</th>
              <th className="table-header">DISCOUNT</th>
              <th className="table-header">STOCK</th>
              <th className="table-header text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="table-cell">
                  <img 
                    src={getImageUrl(product.main_image)}
                    alt={product.title_product}
                    className="w-12 h-12 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                    }}
                  />
                </td>
                <td className="table-cell font-medium">
                  {product.title_product}
                </td>
                <td className="table-cell">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {product.category?.name_category || 'Uncategorized'}
                  </span>
                </td>
                <td className="table-cell font-medium">
                  {formatPrice(product.discount_price)}
                </td>
                <td className="table-cell">
                  {product.original_price > product.discount_price ? (
                    <span className="text-green-600 text-sm">
                      Save {formatPrice(product.original_price - product.discount_price)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">No discount</span>
                  )}
                </td>
                <td className="table-cell">
                  {product.stock_quantity > 0 ? (
                    <span className="text-green-600 font-medium">{product.stock_quantity} in stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </td>
                <td className="table-cell">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onView && onView(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, products.length)} of {products.length} products
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft size={18} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'border hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;