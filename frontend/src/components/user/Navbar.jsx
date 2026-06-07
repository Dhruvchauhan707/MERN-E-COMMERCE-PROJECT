import React, { useState } from 'react';
import '../../styles/user/navbar.css';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaStar
} from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="logo">
          <h2>MyStore</h2>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/image-search">Image Search</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about-us">About Us</Link>
        </div>

        <div className="nav-icons">
          <Link to="/cart" className="icon-btn cart-icon">
            <FaShoppingCart size={28} color="#e74c3c" />
          </Link>
          <Link to="/wishlist" className="icon-btn">
            <FaHeart size={25} color="#e74c3c" />
          </Link>
          <Link to="/profile" className="icon-btn">
            <FaUser size={28} color="#e74c3c" />
          </Link>

        </div>

        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
          <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>About Us</Link>

          <div className="mobile-extra-links">
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}><FaShoppingCart size={28} color="#e74c3c" /> ({cartCount})</Link>
            <Link to="/wishlist" className="icon-btn"><FaHeart size={25} color="#e74c3c" /></Link>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}><FaUser size={28} color="#e74c3c" /> </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;