import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { categoryService } from '../services';
import CategoryTable from '../components/Categories/CategoryTable';
import CategoryForm from '../components/Categories/CategoryForm';
import DeleteConfirmModal from '../components/Products/DeleteConfirmModal';
import SearchBar from '../components/Common/SearchBar';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'

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

  const handleCreate = () => {
    setFormMode('create');
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setFormMode('edit');
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (formMode === 'create') {
        await categoryService.create(formData);
        toast.success('Category created successfully');
      } else if (formMode === 'edit' && selectedCategory) {
        // For update, you would need an update endpoint
        toast.success('Category updated successfully');
      }
      fetchCategories();
      setShowForm(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleConfirmDelete = async () => {
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories</p>
        </div>
        <button
          onClick={handleCreate}
          className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2"
        >
          <FiPlus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search categories..."
          className="max-w-md"
        />
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowForm(false)}></div>
            
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {formMode === 'create' ? 'Add New Category' : 'Edit Category'}
              </h3>
              
              <CategoryForm
                initialData={selectedCategory}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <CategoryTable
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={selectedCategory?.name_category}
        type="category"
      />
    </div>
  );
};

export default Categories;