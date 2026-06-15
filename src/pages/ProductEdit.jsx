import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services';
import ProductForm from '../components/Products/ProductForm';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productService.getById(id);
      // Ensure stock_quantity is included
      console.log('Product data:', data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? 'Edit Product' : 'Create New Product'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEdit ? 'Update product information' : 'Add a new product to your store'}
        </p>
      </div>

      <ProductForm product={product} isEdit={isEdit} />
    </div>
  );
};

export default ProductEdit;