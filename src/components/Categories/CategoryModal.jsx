import React, { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';

const CategoryModal = ({ isOpen, onClose, onSave, category, mode }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (category && mode === 'edit') {
      setName(category.name_category);
    } else {
      setName('');
    }
  }, [category, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ name_category: name });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
          
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {mode === 'create' ? 'Add New Category' : 'Edit Category'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Enter category name"
                autoFocus
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <FiSave size={18} />
                <span>{mode === 'create' ? 'Create' : 'Save'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;