import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { productService } from '../services';
import ProductTable from '../components/Products/ProductTable';
import DeleteConfirmModal from '../components/Products/DeleteConfirmModal';
import SearchBar from '../components/Common/SearchBar';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const filterProducts = useCallback(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title_product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleDelete = async () => {
    if (!selectedProduct) return;
    
    try {
      await productService.delete(selectedProduct.id);
      toast.success('Product deleted successfully');
      fetchProducts();
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button onClick={() => navigate('/products/new')} className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2">
          <FiPlus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search products..." />
          <div className="text-sm text-gray-500">Total: {filteredProducts.length} products</div>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : <ProductTable products={filteredProducts} onEdit={(product) => navigate(`/products/edit/${product.id}`)} onDelete={openDeleteModal} onView={(product) => navigate(`/product/${product.id}`)} />}

      <DeleteConfirmModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDelete} productName={selectedProduct?.title_product} />
    </div>
  );
};

export default Products;