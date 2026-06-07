const express = require("express");
const {adminMiddleware,protectedMiddleware} = require("../middleware/authMiddleware");
const {createCategory,getCategories,getProductsByCategory,deleteCategory,} = require("../controllers/categoryController");


// MULTER CONFIGURATION FOR HANDLING FILE UPLOADS
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const categoryRouter = express.Router();

// CREATE CATEGORY
categoryRouter.post("/", protectedMiddleware, adminMiddleware, upload.single("image"), createCategory);
// GET ALL CATEGORIES
categoryRouter.get("/", getCategories);
// GET PRODUCTS BY CATEGORY
categoryRouter.get("/:category",getProductsByCategory);
// DELETE CATEGORY
categoryRouter.delete("/:id",protectedMiddleware,adminMiddleware,deleteCategory);

module.exports = categoryRouter;