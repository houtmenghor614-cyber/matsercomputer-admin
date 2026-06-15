import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName, type = 'product' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-slideUp">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle size={32} className="text-red-600" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Delete {type === 'product' ? 'Product' : 'Category'}
            </h3>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productName}"? This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;