import React, { useState } from "react";
import "../../styles/user/ImageSearch.css";
import ProductCard from "../../components/user/ProductCard";
import axios from "axios";
import { useImageSearch } from "../../Hooks/useImageSearch";

const ImageSearchPage = () => {
    const {
        products,
        keywords,
        loading,
        searchImage,
    } = useImageSearch();

    const [image, setImage] = useState(null);

    const [searched, setSearched] = useState(false);



    const handleImageSearch = async () => {

        if (!image) {

            alert("Please select an image");
            return;

        }

        setSearched(true);

        await searchImage(image);
          console.log("Products State:", products);
    console.log("Keywords State:", keywords);

    };
  
    return (
        <div className="image-search-page">

            <div className="search-header">
                <h1>Search Products By Image</h1>
                <p>
                    Upload an image and find similar products instantly
                </p>
            </div>

            <div className="upload-section">

                <label className="upload-box">

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />

                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                        />
                    ) : (
                        <>
                            <span>📷</span>
                            <h3>Upload Product Image</h3>
                            <p>JPG, PNG, WEBP Supported</p>
                        </>
                    )}

                </label>

                <button
                    className="search-btn"
                    onClick={handleImageSearch}
                >
                    {loading ? "Searching..." : "Search Products"}
                </button>

            </div>

            <div className="results-section">

                <h2>Search Results</h2>

                {loading ? (

                    <div className="loading-state">
                        <h3>🔍 Finding Products...</h3>
                        <p>Please wait while AI analyzes your image.</p>
                    </div>

                ) : products.length > 0 ? (

                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>

                ) : searched ? (

                    <div className="empty-state">
                        <h3>❌ Product Not Found</h3>
                        <p>No matching products were found.</p>
                    </div>

                ) : (

                    <div className="empty-state">
                        <h3>📷 Upload an Image</h3>
                        <p>Upload a product image to start searching.</p>
                    </div>

                )}

            </div>

        </div>
    );
};

export default ImageSearchPage;