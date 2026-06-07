const productModel = require('../models/productModel');
const mongoose = require('mongoose');
const express = require('express');
const imagekit = require('../config/imagekit');
const ProductModel = require('../models/productModel');

//ADD PRODUCT CONTROLLER (ADMIN ONLY)
const addProductController = async (req, res) => {

  const { name, description, price, category, stock } = req.body;

  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const uploadedImage = await imagekit.upload({
    file: file.buffer,
    fileName: file.originalname,
  });

  const newProduct = await productModel.create({
    name,
    description,
    price,
    category,
    stock,
    image: uploadedImage.url,
    user: req.user._id,
  });


  res.status(201).json({
    message: 'Product created successfully',
    newProduct
  });
};


// GET ALL PRODUCTS
const getAllProductsController = async (req, res) => {
  try {

    const products = await ProductModel.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
}

// GET PRODUCT BY ID
const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

// UPDATE PRODUCT BY ID (ADMIN ONLY)
const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock } = req.body;

  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    { name, description, price, category, stock },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(updatedProduct);
};

// DELETE PRODUCT BY ID (ADMIN ONLY)
const deleteProductController = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product deleted successfully' });
};

// FILTER PRODUCTS
const filterProducts = async (req, res) => {
  try {
    const { category, search, price, } = req.query;

     console.log("QUERY:", req.query);

    let query = {};


    // category
    if (
      category &&
      category !== "All"
    ) {

      query.category = category;
    }

    // search
    if (search) {

      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // price
    if (price) {

      query.price = {
        $lte: Number(price),
      };
    }
        console.log("FINAL QUERY:", query);

    const products = await ProductModel
      .find(query)
      .populate("category");
    res.json(products);
        console.log("PRODUCTS FOUND:", products.length);


  } catch (error) {
  console.log("FILTER ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}
};

// GET LATEST PRODUCTS
const getLatestProducts = async (req, res) => {
  try {

    const products = await ProductModel
      .find()
      .sort({ createdAt: -1 }) // newest first
      .limit(10);

    res.json(products);
  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addProductController,
  getAllProductsController,
  getProductByIdController,
  filterProducts,
  updateProductController,
  deleteProductController,
  getLatestProducts
};
