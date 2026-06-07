import React from 'react';
import '../../styles/user/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>MyStore</h3>
            <p>Your trusted online shopping destination for quality products at best prices.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/deals">Deals</Link>
            <Link to="/about">About Us</Link>
          </div>

          <div className="footer-column">
            <h4>Customer Service</h4>
            <Link to="/contact">Contact Us</Link>
            <Link to="/shipping">Shipping Policy</Link>
            <Link to="/returns">Returns & Exchange</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/track-order">Track Your Order</Link>
          </div>

          <div className="footer-column">
            <h4>Stay Updated</h4>
            <p>Subscribe to get special offers and latest updates</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 MyStore. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;