import React, { useState } from 'react';
import '../../styles/user/ProductDetail.css';
import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from '../../Hooks/useCart';
import { toast } from "react-toastify";
import Footer from '../../components/user/Footer';

import { useEffect } from "react";

import { FaHeart, FaShoppingCart, FaStar, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const { id } = useParams();

  const { getProductById } = useProducts();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchProduct =
      async () => {

        const data =
          await getProductById(id);

        setProduct(data);
      };

    fetchProduct();

  }, [id]);


  if (!product) {
    return <h2>Loading...</h2>;
  }

  const addToCartHandler = async () => {
      try {
  
        await addToCart(
          product._id,
        );
  
        toast.success(
          "Product Added to Cart"
        );
  
      } catch (error) {
        console.log(error);
        toast.error("Please Login First");
      }
    };


  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];



  const toggleWishlist = () => {
    alert("❤️ Added to Wishlist");
  };

  return (
    <>
    <div className="product-detail-page">
      <div className="product-container">

        {/* Left - Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.image} />
          </div>

        </div>

        {/* Right - Details */}
        <div className="product-info">
          <h1>{product.name}</h1>

          <div className="rating">
            <span>⭐ {product.rating}</span>
            <span className="review-count">({product.reviewCount} reviews)</span>
          </div>

          <div className="price-section">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>

          <p className="description">{product.description}</p>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={addToCartHandler}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="wishlist-btn" onClick={toggleWishlist}>
              <FaHeart /> Wishlist
            </button>
          </div>

          {/* Delivery Info */}
          <div className="delivery-info">
            <div className="info-item">
              <FaTruck /> <span>Free Delivery on orders above ₹499</span>
            </div>
            <div className="info-item">
              <FaShieldAlt /> <span>1 Year Warranty</span>
            </div>
            <div className="info-item">
              <FaUndo /> <span>7 Days Easy Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProductDetail;