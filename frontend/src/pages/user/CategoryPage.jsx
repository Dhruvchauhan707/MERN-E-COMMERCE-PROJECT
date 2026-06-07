// src/pages/CategoryPage.jsx
import React, { useState } from 'react';
import '../../styles/user/CategoryPage.css';
import { FaSortAmountDown } from 'react-icons/fa';
import Footer from '../../components/user/Footer';
import ProductCard from "../../components/user/ProductCard";
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import Loader from '../../components/common/Loader';

const CategoryPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('all');

    const { categories, categoryLoading } = useCategories();
    const { products: allProducts, productLoading } = useProducts();

    const filteredProducts = selectedCategory === "all"
        ? allProducts
        : allProducts.filter(product => product.category === selectedCategory);

    if (productLoading || categoryLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="category-page">
                <h1 className="main-title">Shop by Category</h1>

                <div className="categories-container">
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className={`category-item ${selectedCategory === cat._id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat._id)}
                        >
                            <div className="category-image">
                                <img src={cat.image} alt={cat.name} />
                            </div>
                            <p className="category-name">{cat.name}</p>
                        </div>
                    ))}
                </div>

                <div className="products-section">
                    <div className="products-header">
                        <h2>
                            {selectedCategory === 'all'
                                ? 'All Products'
                                : categories.find(c => c._id === selectedCategory)?.name || ''}
                        </h2>

                        <div className="sort-box">
                            <FaSortAmountDown />
                            <select>
                                <option>Newest First</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {!productLoading && filteredProducts.length === 0 && (
                        <h3>No products found in this category</h3>
                    )}
                </div>
            </div>
            <Footer />

        </>
    );
};

export default CategoryPage;