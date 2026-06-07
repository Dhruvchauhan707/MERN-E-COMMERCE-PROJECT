// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import { categoryApi } from '../api/categoryApi';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories on component mount
   
        const fetchCategories = async () => {
            try {
                const { data } = await categoryApi.getAllCategories();
                
                setCategories([
                    {
                        _id: "all",
                        name: "All Products",
                        image: "https://www.amanbrand.in/cdn/shop/collections/All_Products.png?v=1714294501",
                    },
                    ...data
                ]);
                
            } catch (err) {
                setError("Failed to load categories");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };


   const createCategory = async (formData) => {
        try {
            const { data } = await categoryApi.createCategory(formData);
            setCategories(prev => [...prev, data]);
            return data;
        } catch (err) {
            console.error("Create Category Error:", err);
            throw err;
        }
    };

    const deleteCategory = async (id) => {
        try {
            await categoryApi.deleteCategory(id);
            setCategories(prev => prev.filter(cat => cat._id !== id));
        } catch (err) {
            console.error("Delete Category Error:", err);
            throw err;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        deleteCategory,
    };
};  