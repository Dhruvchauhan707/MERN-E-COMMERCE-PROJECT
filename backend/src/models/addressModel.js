const mongoose = require("mongoose");

const addressSchema =
new mongoose.Schema(

  {

    // kis user ka address he
    user: {

      type:
      mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    // full name
    fullName: {

      type: String,

      required: true,

      trim: true,

    },

    // phone number
    phone: {

      type: String,

      required: true,

    },

    // full address
    address: {

      type: String,

      required: true,

    },

    // city
    city: {

      type: String,

      required: true,

    },

    // postal code
    postalCode: {

      type: String,

      required: true,

    },

    // country
    country: {

      type: String,

      required: true,

      default: "India",

    },

    // default address
    isDefault: {

      type: Boolean,

      default: false,

    },

  },

  {

    timestamps: true,

  }

);

const addressModel = mongoose.model("Address",addressSchema);

module.exports = addressModel;