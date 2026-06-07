const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");

// IMORT ROUTES
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');  
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const imagesearchRouter = require("./routes/imagesearchRoutes")

// MULTER CONFIGURATION FOR FILE UPLOADS
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: "https://myshop-mernapp.netlify.app",
   credentials: true,
}));

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', upload.single("image"), productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api',upload.single("image"),imagesearchRouter)

// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});


module.exports = app;