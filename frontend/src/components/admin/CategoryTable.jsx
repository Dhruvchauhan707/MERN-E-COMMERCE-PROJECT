import React, { useState } from 'react';
import '../../styles/admin/ProductTable.css'; // Base table styling share karne ke liye
import '../../styles/admin/CategoryTable.css'; // New CSS for CategoryTable

const CategoryTable = ({ categories, handleAddCategory, handleDeleteCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);

  const onSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "name",
      categoryName
    );

    formData.append(
      "image",
      image
    );

    await handleAddCategory(
      formData
    );

  };

  

  return (
    <div className="category-management-layout">
      {/* 📝 LEFT SIDE: ADD CATEGORY FORM */}
      <div className="category-form-container">
        <h3>📂 Add New Category</h3>
        <form onSubmit={onSubmit} className="inline-cat-form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              placeholder="E.g., Electronics, Home Decor"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category Image</label>

            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              required
            />
          </div>
          <button type="submit" className="add-cat-btn">Create Category</button>
        </form>
      </div>

      {/* 📊 RIGHT SIDE: CATEGORIES LIST TABLE */}
      <div className="table-container category-table-box">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
                  📂 No categories created yet.
                </td>
              </tr>
            ) : (
              categories.map((cat,indx) => (
                <tr key={indx}>
                  <td><img className="category-image" src={cat.image} alt={cat.name} /></td>
                  <td><strong>{cat.name}</strong></td>
                  <td>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteCategory(cat._id)}
                      title="Delete Category"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;