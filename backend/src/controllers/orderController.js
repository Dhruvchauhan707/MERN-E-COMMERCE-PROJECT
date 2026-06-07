const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");


// PLACE ORDER
const placeOrder = async (req,res) => {
  try {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, status, totalPrice,} = req.body;

    // check order items
    if (
      orderItems.length === 0
    ) {

      return res.status(400).json({
        message: "No Order Items",
      });

    }

    // create order
    const order =
      await orderModel.create({

        user: req.user.id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        status,
      });

    // clear cart
    await cartModel.deleteMany({

      user: req.user.id,

    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      user: req.user.id
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleOrder = async (req, res) => {

  try {

    const order = await orderModel.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate("orderItems.product");

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getAllOrders = async (req, res) => {

  try {

    const orders = await orderModel.find()
      .populate("user", "name email");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    if (req.body.status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    res.json({
      message: "Status Updated",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus
};