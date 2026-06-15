import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { categoryService } from '../services';
import CategoryTable from '../components/Categories/CategoryTable';
import CategoryModal from '../components/Categories/CategoryModal';
import DeleteConfirmModal from '../components/Products/DeleteConfirmModal';
import SearchBar from '../components/Common/SearchBar';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    if (!searchTerm) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.name_category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleSave = async (categoryData) => {
    try {
      if (modalMode === 'create') {
        await categoryService.create(categoryData);
        toast.success('Category created successfully');
      }
      fetchCategories();
      setModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    
    try {
      await categoryService.delete(selectedCategory.id);
      toast.success('Category deleted successfully');
      fetchCategories();
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories</p>
        </div>
        <button
          onClick={openCreateModal}
          className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2"
        >
          <FiPlus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search categories..."
          className="max-w-md"
        />
      </div>

      <CategoryTable
        categories={filteredCategories}
        onEdit={() => {}}
        onDelete={openDeleteModal}
        onView={() => {}}
      />

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        category={selectedCategory}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        productName={selectedCategory?.name_category}
        type="category"
      />
    </div>
  );
};

export default Categories;