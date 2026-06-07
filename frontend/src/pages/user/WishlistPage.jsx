import React, { useState } from 'react';
import '../../styles/user/WishlistPage.css';
import { FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Cotton Shirt",
      price: 899,
      originalPrice: 1299,
      img: "https://via.placeholder.com/280x280",
      rating: 4.5
    },
    {
      id: 2,
      name: "Wireless Noise Cancelling Headphones",
      price: 2499,
      originalPrice: 3499,
      img: "https://via.placeholder.com/280x280",
      rating: 4.8
    },
    {
      id: 3,
      name: "Smart Watch Series 8",
      price: 3299,
      originalPrice: 4499,
      img: "https://via.placeholder.com/280x280",
      rating: 4.3
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveToCart = (item) => {
    alert(`${item.name} moved to cart!`); // Backend integration ke liye yaha function call kar sakte ho
    removeFromWishlist(item.id);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <FaHeart size={80} color="#ddd" />
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite products here</p>
          <button className="shop-now-btn">Start Shopping</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div className="wishlist-card" key={item.id}>
              <div className="card-image">
                <img src={item.img} alt={item.name} />
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FaTrash />
                </button>
              </div>

              <div className="card-content">
                <h4>{item.name}</h4>
                
                <div className="price-section">
                  <span className="current-price">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price">₹{item.originalPrice}</span>
                  )}
                </div>

                <p className="rating">⭐ {item.rating}</p>

                <div className="card-actions">
                  <button 
                    className="move-to-cart-btn"
                    onClick={() => moveToCart(item)}
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;