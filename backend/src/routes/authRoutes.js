const express = require('express');
const {adminMiddleware, protectedMiddleware } = require('../middleware/authMiddleware');
const { registerController,loginController,getProfile } = require('../controllers/authController');
const authRoutes = express.Router();

//REGISTER CONTROLLER
authRoutes.post('/login',loginController);
//REGISTER CONTROLLER
authRoutes.post('/register',registerController);
//GET PROFILE CONTROLLER
authRoutes.get('/profile',protectedMiddleware,getProfile);



module.exports = authRoutes;