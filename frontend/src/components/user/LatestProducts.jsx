import React, { useState } from 'react';
import '../../styles/user/LatestProducts.css';
import ProductCard from '../../components/user/ProductCard';

const LatestProducts = ({ products }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };


  return (
    <section className="latest-products">
      <div className="section-header">
        <div className="header-content">
          <div>
            <h2>Latest Products</h2>
            <p>Discover our newest arrivals</p>
          </div>
          <button className="view-all-btn">
            View All Products →
          </button>
        </div>
      </div>

      <div className="products-line">
        {products?.map((product,index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;