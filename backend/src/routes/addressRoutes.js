const express = require("express");
const addressRoutes = express.Router();

const { addAddress, getMyAddresses, deleteAddress, updateAddress } = require("../controllers/addressController" );
const { protectedMiddleware } = require("../middleware/authMiddleware");


// ADD ADDRESS
addressRoutes.post("/",protectedMiddleware,addAddress);
// GET MY ADDRESSES
addressRoutes.get("/",protectedMiddleware,getMyAddresses);
// DELETE ADDRESS
addressRoutes.delete("/:id",protectedMiddleware,deleteAddress);
// UPDATE ADDRESS
addressRoutes.put("/:id", protectedMiddleware, updateAddress);


module.exports = addressRoutes;