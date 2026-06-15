// Validation functions for forms

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
  return regex.test(phone);
};

export const validatePrice = (price) => {
  return price > 0 && !isNaN(price);
};

export const validateProductForm = (formData) => {
  const errors = {};

  if (!formData.title_product || formData.title_product.trim().length < 3) {
    errors.title_product = 'Product name must be at least 3 characters';
  }

  if (!formData.original_price || formData.original_price <= 0) {
    errors.original_price = 'Original price must be greater than 0';
  }

  if (!formData.discount_price || formData.discount_price <= 0) {
    errors.discount_price = 'Discount price must be greater than 0';
  }

  if (formData.discount_price > formData.original_price) {
    errors.discount_price = 'Discount price cannot be greater than original price';
  }

  if (!formData.category_id) {
    errors.category_id = 'Please select a category';
  }

  if (!formData.color || formData.color.trim().length < 2) {
    errors.color = 'Please enter a valid color';
  }

  if (!formData.description || formData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateCategoryForm = (name) => {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Category name must be at least 2 characters';
  }

  if (name && name.trim().length > 50) {
    errors.name = 'Category name must be less than 50 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateOrderStatus = (status) => {
  const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
  return validStatuses.includes(status);
};

export const validateSearchQuery = (query) => {
  return query && query.trim().length >= 2;
};