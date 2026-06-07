const cartModel = require("../models/cartModel");
const Product = require("../models/productModel");


// ADD TO CART
const addToCart = async (req, res) => {

  try {
    
    const { productId, quantity } = req.body;

    // product check
    const product = await Product.findById(productId);

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }
    // existing cart item check
    const existingCart = await cartModel.findOne({
      user: req.user.id,
      product: productId,
    });

     
    // quantity update
    if (existingCart) {

      existingCart.quantity += quantity;

      await existingCart.save();

      return res.json(existingCart);

    }

    // create new cart item
    const cart = await cartModel.create({
      user: req.user.id,
      product: productId,
      quantity,
    });

    res.status(201).json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER CART
const getCart = async (req, res) => {

  try {
    const cartItems = await cartModel.find({
      user: req.user.id,
    }).populate("product");

    res.json(cartItems);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// REMOVE CART ITEM
const removeCartItem = async (req, res) => {

  try {

    const cartItem = await cartModel.findById(
      req.params.id
    );

    if (!cartItem) {

      return res.status(404).json({
        message: "Cart item not found",
      });

    }

    await cartItem.deleteOne();

    res.json({
      message: "Item removed from cart",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateCartItem = async (req, res) => {

  try {

    const { quantity } = req.body;

    const cartItem = await cartModel.findById(
      req.params.id
    );

    if (!cartItem) {

      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
};