import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi';
import { productService, categoryService } from '../../services';
import ProductImageUpload from './ProductImageUpload';
import toast from 'react-hot-toast';

const ProductForm = ({ product, isEdit }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title_product: '',
    original_price: '',
    discount_price: '',
    category_id: '',
    color: '',
    sizes: [],
    description: '',
    stock_quantity: 0,
    is_featured: false
  });
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [sizeInput, setSizeInput] = useState('');

  useEffect(() => {
    fetchCategories();
    if (product && isEdit) {
      loadProductData();
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadProductData = () => {
    let parsedSizes = [];
    try {
      if (product.sizes) {
        if (typeof product.sizes === 'string') {
          parsedSizes = JSON.parse(product.sizes);
        } else if (Array.isArray(product.sizes)) {
          parsedSizes = product.sizes;
        }
      }
    } catch (error) {
      console.error('Error parsing sizes:', error);
      parsedSizes = [];
    }
    
    setFormData({
      title_product: product.title_product || '',
      original_price: product.original_price || '',
      discount_price: product.discount_price || '',
      category_id: product.category_id || '',
      color: product.color || '',
      sizes: parsedSizes,
      description: product.description || '',
      stock_quantity: product.stock_quantity || 0,
      is_featured: product.is_featured || false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addSize = () => {
    if (sizeInput && sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, sizeInput.trim()],
      });
      setSizeInput('');
    }
  };

  const removeSize = (sizeToRemove) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter(size => size !== sizeToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append('title_product', formData.title_product);
    submitData.append('original_price', formData.original_price);
    submitData.append('discount_price', formData.discount_price);
    submitData.append('category_id', formData.category_id);
    submitData.append('color', formData.color);
    submitData.append('sizes', JSON.stringify(formData.sizes));
    submitData.append('description', formData.description);
    submitData.append('stock_quantity', formData.stock_quantity);
    submitData.append('is_featured', formData.is_featured);

    if (mainImage) {
      submitData.append('main_image', mainImage);
    }
    
    subImages.forEach(img => {
      submitData.append('sub_images', img);
    });

    try {
      if (isEdit) {
        await productService.update(product.id, submitData);
        toast.success('Product updated successfully');
      } else {
        await productService.create(submitData);
        toast.success('Product created successfully');
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input type="text" name="title_product" value={formData.title_product} onChange={handleChange} required className="input-field" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} required className="input-field">
              <option value="">Select Category</option>
              {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name_category}</option>))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price *</label>
            <input type="number" name="original_price" value={formData.original_price} onChange={handleChange} required step="0.01" className="input-field" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price *</label>
            <input type="number" name="discount_price" value={formData.discount_price} onChange={handleChange} required step="0.01" className="input-field" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} required className="input-field" placeholder="e.g., Black, White, Red" />
          </div>
          
          {/* STOCK QUANTITY FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
            <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required min="0" className="input-field" placeholder="Enter stock quantity" />
            <p className="text-xs text-gray-500 mt-1">Set to 0 to show "Out of Stock" on the website</p>
            {formData.stock_quantity === 0 && (
              <p className="text-xs text-red-500 mt-1">⚠️ This product will appear as "Out of Stock" to customers</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
            <div className="flex space-x-2">
              <input type="text" value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} className="flex-1 input-field" placeholder="Add size (e.g., S, M, L)" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())} />
              <button type="button" onClick={addSize} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><FiPlus size={18} /></button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.sizes.map(size => (<span key={size} className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-lg text-sm">{size}<button type="button" onClick={() => removeSize(size)} className="ml-2 text-red-600 hover:text-red-700"><FiTrash2 size={12} /></button></span>))}
            </div>
          </div>
          
          <div className="flex items-center mt-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Feature this product</span>
            </label>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="5" className="input-field"></textarea>
        </div>
      </div>

      <ProductImageUpload mainImage={mainImage} setMainImage={setMainImage} subImages={subImages} setSubImages={setSubImages} existingImages={product?.images} existingMainImage={product?.main_image} />

      <div className="flex justify-end space-x-3">
        <button type="button" onClick={() => navigate('/products')} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2 disabled:opacity-50">
          <FiSave size={18} />
          <span>{loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}</span>
        </button>
      </div>
    </form>
  );
};

export default ProductForm;