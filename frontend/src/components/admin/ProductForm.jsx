import React from 'react';
import '../../styles/admin/ProductForm.css';

const ProductForm = ({ formData, categories, handleInputChange, handleFormSubmit, setShowForm, isEditMode, setIsEditMode, setFormData }) => {

  const handleCancel = () => {
    setShowForm(false);
    setIsEditMode(false);
    setFormData({ name: '', price: '', stock: '', category: '', image: '' });
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <button type="button" className="back-btn" onClick={handleCancel}>←</button>
        {/* Dynamic Title based on Edit Mode */}
        <h3>{isEditMode ? '✏️ Edit Product Details' : '📦 Add New Product'}</h3>
      </div>

      <form className="product-form" onSubmit={handleFormSubmit}>
        {/* Inputs are exactly same, React will automatically fill values during edit */}
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter product name" required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="0" required />
          </div>
          <div className="form-group">
            <label>Stock Quantity</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="E.g. 100" required />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product Description"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Product Image URL</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.files[0],
              })
            }
          />
        </div>
        <div className="form-actions">
          {/* Dynamic Button Text */}
          <button type="submit" className="save-btn">{isEditMode ? 'Update Product' : 'Save Product'}</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;