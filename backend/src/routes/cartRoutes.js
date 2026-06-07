const express = require("express");
const { protectedMiddleware } = require("../middleware/authMiddleware");
const {addToCart,getCart,removeCartItem,updateCartItem} = require("../controllers/cartController");

const cartRouter = express.Router();

// ADD TO CART
cartRouter.post("/", protectedMiddleware, addToCart);
// GET USER CART
cartRouter.get("/", protectedMiddleware, getCart);
// REMOVE CART ITEM
cartRouter.delete("/remove/:id", protectedMiddleware, removeCartItem);
// UPDATE CART ITEM
cartRouter.put("/update/:id", protectedMiddleware, updateCartItem);

module.exports = cartRouter;