const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//REGISTER CONTROLLER
const registerController = async (req,res) => {
    const {name,email,password} = req.body;

    const existingUser = await userModel.findOne({email});

    if(existingUser){
        return res.status(400).json({message:'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({
        name,
        email,
        password:hashedPassword
    });

    const token = jwt.sign(
    {
            id: newUser._id,
            role: newUser.role
        },
        process.env.JWT_SECRET,
        {expiresIn:'10h'}
    );

    res.cookie('token', token)

    res.status(201).json({
        message:'User created successfully',
        newUser,
        token
    });
}    


//LOGIN CONTROLLER
const loginController = async (req,res) => {
    const {email,password} = req.body;

    const existingUser = await userModel.findOne({email});

    if(!existingUser){
        return res.status(400).json({message:'User does not exist'});
    }

    const isPasswordValid = await bcrypt.compare(password,existingUser.password);

    if(!isPasswordValid){
        return res.status(400).json({message:'Invalid password'});
    }

    const token = jwt.sign(
        {
            id: existingUser._id,
            role: existingUser.role
        },
        process.env.JWT_SECRET,
        {expiresIn:'10h'}
    );

    res.cookie('token', token)

    res.status(200).json({
        message:'Login successful',
        token,
        role:existingUser.role

    });

    console.log(existingUser.role)
}


//GET PROFILE CONTROLLER
const getProfile = async (req, res) => {

  try {

    const user = await userModel.findById(
        req.user.id
      ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
    registerController,
    loginController,
    getProfile
}