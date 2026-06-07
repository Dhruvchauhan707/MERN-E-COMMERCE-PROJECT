import React, { useState } from 'react';
import '../../styles/admin/ProductTable.css';
import { Link } from 'react-router-dom';

const ProductTable = ({ products, handleDelete, handleEditClick }) => {
  // Yeh state select kiye gaye product ki details yaad rakhegi modal ke liye
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditFromModal = (product) => {
    handleEditClick(product); // Parent (AdminHome) ka edit form open karega
    setSelectedProduct(null); // Modal ko close karega
  };

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
                No products match your search.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td><img src={product.image} alt={product.name} className="table-img" /></td>
                <td><strong>{product.name}</strong></td>
                <td>{product.category?.name || 'N/A'}</td>
                <td>₹{Number(product.price).toLocaleString('en-IN')}</td>
                <td>
                  <span className={`stock-badge ${Number(product.stock) > 10 ? 'in-stock' : 'low-stock'}`}>
                    {product.stock} {Number(product.stock) > 10 ? 'In Stock' : 'Low Stock'}
                  </span>
                </td>
                <td>
                  <button className="action-btn view" onClick={() => setSelectedProduct(product)} title="View Details">
                    👁️
                  </button>
                  <button className="action-btn edit" onClick={() => handleEditClick(product)} title="Edit Product">
                    ✏️
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(product._id)} title="Delete Product">
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 🚨 RESPONSIVE PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Product Details</h3>
              <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-img-container">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <span className="modal-category">{selectedProduct.category ? selectedProduct.category.toUpperCase() : 'N/A'}</span>
                <hr />
                <p><strong>Price:</strong> <span className="modal-price">₹{Number(selectedProduct.price).toLocaleString('en-IN')}</span></p>
                <p><strong>Stock Status:</strong> {selectedProduct.stock} Units Left</p>
                <p><strong>Product ID:</strong> {selectedProduct._id}</p>
                <p><strong>Description:</strong> {selectedProduct.description || 'No description added'}</p>
                
                {/* ✨ Naya Edit Button Modal ke andar */}
                <button 
                  className="modal-edit-btn" 
                  onClick={() => handleEditFromModal(selectedProduct)}
                >
                  ✏️ Edit This Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;