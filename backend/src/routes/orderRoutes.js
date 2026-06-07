const express = require("express");
const {placeOrder,getMyOrders,getSingleOrder,getAllOrders,updateOrderStatus} = require("../controllers/orderController");
const {protectedMiddleware,adminMiddleware} = require("../middleware/authMiddleware");

const orderRouter = express.Router();

// PLACE ORDER
orderRouter.post("/",protectedMiddleware,placeOrder);
// GET MY ORDERS
orderRouter.get("/myorders",protectedMiddleware,getMyOrders);
// GET ALL ORDERS (ADMIN ONLY)
orderRouter.get("/all",protectedMiddleware,adminMiddleware,getAllOrders);
// GET SINGLE ORDER
orderRouter.get("/:id",protectedMiddleware,getSingleOrder);
// UPDATE ORDER STATUS
orderRouter.put("/:id/status",protectedMiddleware,adminMiddleware,updateOrderStatus);

module.exports = orderRouter;