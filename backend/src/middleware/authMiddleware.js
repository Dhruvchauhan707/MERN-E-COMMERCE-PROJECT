const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


//ADMIN MIDDLEWARE FOR PROTECTED ROUTES
const adminMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  next();
}


//PROTECTED MIDDLEWARE FOR VERIFYING JWT TOKEN AND ATTACHING USER TO REQUEST
const protectedMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {

      return res.status(401).json({
        message: "No Token",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token",
    });

  }
};


module.exports = {
  adminMiddleware,
  protectedMiddleware,
};