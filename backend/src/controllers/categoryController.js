const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const imagekit = require('../config/imagekit');


// CREATE CATEGORY
const createCategory = async (req, res) => {

    try {
        const { name } = req.body;

        const file = req.file;

        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
        });

        const category = await categoryModel.create({
            name,
            image: uploadedImage.url,
        });

        res.status(201).json(category);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// GET ALL CATEGORIES
const getCategories = async (req, res) => {

    try {
        const categories = await categoryModel.find();

        res.json(categories);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// GET PRODUCTS BY CATEGORY
const getProductsByCategory = async (req, res) => {

        try {
            const products = await productModel.find({
                    category: req.params.category,
                });

            res.json(products);

        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
};


// DELETE CATEGORY
const deleteCategory = async (req, res) => {

    const { id } = req.params;

    const deletedCategory = await categoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
};


module.exports = {
    createCategory,
    getCategories,
    getProductsByCategory,
    deleteCategory,
};