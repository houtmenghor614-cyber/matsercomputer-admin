import React, { useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

const ProductImageUpload = ({ mainImage, setMainImage, subImages, setSubImages, existingImages = [], existingMainImage }) => {
  const mainImageRef = useRef();
  const subImageRef = useRef();

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setSubImages([...subImages, ...files]);
  };

  const removeSubImage = (index) => {
    setSubImages(subImages.filter((_, i) => i !== index));
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Product Images</h2>
      
      {/* Main Image */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Image *
        </label>
        <div className="flex items-start space-x-4">
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
            {mainImage ? (
              <img
                src={URL.createObjectURL(mainImage)}
                alt="Main preview"
                className="w-full h-full object-cover"
              />
            ) : existingMainImage ? (
              <img
                src={`http://localhost:8000/${existingMainImage}`}
                alt="Existing main"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/128x128?text=No+Image';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiImage size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => mainImageRef.current.click()}
              className="btn-outline flex items-center space-x-2"
            >
              <FiUpload size={18} />
              <span>Upload Main Image</span>
            </button>
            <input
              ref={mainImageRef}
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">
              Recommended: 800x800px, JPG or PNG
            </p>
          </div>
        </div>
      </div>

      {/* Sub Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Images
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {subImages.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(img)}
                alt={`Sub ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeSubImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
          {existingImages && existingImages.length > 0 && existingImages.map((img, index) => (
            <div key={`existing-${index}`} className="relative group">
              <img
                src={`http://localhost:8000/${img.image_path}`}
                alt={`Existing ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/96x96?text=No+Image';
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => subImageRef.current.click()}
            className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors bg-gray-50"
          >
            <FiUpload size={24} className="text-gray-400" />
            <span className="text-xs text-gray-500 mt-1">Upload</span>
          </button>
        </div>
        <input
          ref={subImageRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleSubImagesChange}
          className="hidden"
        />
        <p className="text-xs text-gray-500">
          You can upload up to 5 additional images
        </p>
      </div>
    </div>
  );
};

export default ProductImageUpload;