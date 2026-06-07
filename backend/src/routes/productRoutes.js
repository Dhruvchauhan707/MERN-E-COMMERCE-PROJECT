const express = require('express');
const { addProductController,getAllProductsController,getProductByIdController,updateProductController,deleteProductController,filterProducts,getLatestProducts} = require('../controllers/productController');
const { adminMiddleware,protectedMiddleware} = require('../middleware/authMiddleware');


const productRoutes = express.Router();

// ADD PRODUCT (ADMIN ONLY)
productRoutes.post('/add',protectedMiddleware, adminMiddleware,addProductController);
// GET ALL PRODUCTS
productRoutes.get('/all', getAllProductsController);
// GET PRODUCT BY ID
productRoutes.get('/filter', filterProducts);
// GET LATEST PRODUCTS
productRoutes.get('/latest', getLatestProducts);
// GET PRODUCT BY ID
productRoutes.get('/:id', getProductByIdController);
// UPDATE PRODUCT (ADMIN ONLY)
productRoutes.put('/:id',protectedMiddleware, adminMiddleware, updateProductController);
// DELETE PRODUCT (ADMIN ONLY)
productRoutes.delete('/:id',protectedMiddleware, adminMiddleware, deleteProductController);

module.exports = productRoutes;