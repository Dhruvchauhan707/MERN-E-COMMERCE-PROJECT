// src/api/categoryApi.js
import axios from "./axios";

export const categoryApi = {
    // Get all categories
    getAllCategories: () => axios.get("/api/categories"),

    // Create new category
    createCategory: (formData) => 
        axios.post("/api/categories", formData, {
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
            withCredentials: true,
        }),

    // Delete category
    deleteCategory: (id) => 
        axios.delete(`/api/categories/${id}`, { 
            withCredentials: true 
        }),

};