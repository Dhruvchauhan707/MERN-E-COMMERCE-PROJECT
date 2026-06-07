const addressModel = require("../models/addressModel");


// ADD ADDRESS
const addAddress = async (req,res) => {

  try {
    const { fullName, phone, address, city, postalCode, country } = req.body;

    // create address
    const newAddress =
      await addressModel.create({
      user: req.user.id,
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
    });
    res.status(201).json(
      newAddress
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY ADDRESSES
const getMyAddresses = async (req, res) => {

  try {

    const addresses = await addressModel.find({
      user: req.user.id,
    });

    res.json(addresses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ADDRESS
const deleteAddress = async (req, res) => {

  try {
    const address = await addressModel.findById(
        req.params.id
      );

    if (!address) {
      return res.status(404).json({
        message:"Address Not Found",
      });
    }

    await address.deleteOne();

    res.json({
      message:"Address Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ADDRESS
const updateAddress = async (req, res) => {

  try {

    const address = await addressModel.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address Not Found",
      });
    }

    // security check
    if (address.user.toString() !== req.user.id) {

      return res.status(401).json({
        message: "Unauthorized",
      });

    }

    address.fullName = req.body.fullName || address.fullName;
    address.phone = req.body.phone || address.phone;
    address.address = req.body.address || address.address;
    address.city = req.body.city || address.city;
    address.postalCode = req.body.postalCode || address.postalCode;
    address.country = req.body.country || address.country;

    const updatedAddress = await address.save();

    res.json(updatedAddress);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addAddress,
  getMyAddresses,
  deleteAddress,
  updateAddress,
};