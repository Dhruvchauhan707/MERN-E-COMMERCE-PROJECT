const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {

    // kis user ne order kiya
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // ordered products
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    // shipping address
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
    },

    // payment method
    paymentMethod: {
      type: String,
      required: true,
    },

    // prices
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    // payment status
    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    // delivery status
    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;