import React from 'react';
import '../../styles/user/Categories.css';

const Categories = ({ categories }) => {

  return (
    <section className="categories-section">
       <div className="section-header">
        <div className="header-content">
          <div>
            <h2>Browse Categories</h2>
            <p>Shop by your favorite categories</p>
          </div>
          <button className="view-all-btn">
            View All Categories →
          </button>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.image} alt={category.name} />
            <div className="category-overlay">
              <h3>{category.name}</h3>
              <p>{category.count}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;