import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const CategoryTable = ({ categories, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  if (categories.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">No categories found</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">#</th>
              <th className="table-header">Category Name</th>
              <th className="table-header">Slug</th>
              <th className="table-header">Products Count</th>
              <th className="table-header">Created Date</th>
              <th className="table-header text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCategories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                <td className="table-cell text-gray-500">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="table-cell">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">
                        {category.name_category.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{category.name_category}</span>
                  </div>
                </td>
                <td className="table-cell text-gray-500">
                  {category.name_category.toLowerCase().replace(/\s+/g, '-')}
                </td>
                <td className="table-cell">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {category.products?.length || 0} products
                  </span>
                </td>
                <td className="table-cell text-gray-500">
                  {new Date(category.created_at).toLocaleDateString()}
                </td>
                <td className="table-cell">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onView && onView(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(category)}
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
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, categories.length)} of {categories.length} categories
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
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
              className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;