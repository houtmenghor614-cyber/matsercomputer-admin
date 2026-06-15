import React, { useState, useEffect } from 'react';
import { FiSave, FiX, FiFolder } from 'react-icons/fi';
import { validateCategoryForm } from '../../utils/validators';

const CategoryForm = ({ initialData, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name_category: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_category: initialData.name_category || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    const validation = validateCategoryForm(value);
    setErrors(prev => ({
      ...prev,
      [name]: validation.errors[name],
    }));
    return validation.isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validation = validateCategoryForm(formData.name_category);
    
    if (validation.isValid) {
      onSubmit(formData);
    } else {
      setErrors(validation.errors);
      setTouched({
        name_category: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name *
        </label>
        <div className="relative">
          <FiFolder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name_category"
            value={formData.name_category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input-field pl-10 ${touched.name_category && errors.name_category ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter category name (e.g., Electronics, Gaming, Accessories)"
            disabled={isLoading}
          />
        </div>
        {touched.name_category && errors.name_category && (
          <p className="mt-1 text-sm text-red-600">{errors.name_category}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          This will be used to group related products
        </p>
      </div>

      {/* Preview */}
      {formData.name_category && !errors.name_category && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {formData.name_category.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{formData.name_category}</p>
              <p className="text-xs text-gray-500">
                Slug: {formData.name_category.toLowerCase().replace(/\s+/g, '-')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex items-center space-x-2"
          disabled={isLoading}
        >
          <FiX size={18} />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <FiSave size={18} />
          <span>{isLoading ? 'Saving...' : (initialData ? 'Update Category' : 'Create Category')}</span>
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;