const {imageSearch} = require("../controllers/imagesearchController")
const express  = require("express")
const multer = require('multer');


const imagesearchRouter = express.Router()

imagesearchRouter.post(
  "/image-search",
  imageSearch
);


module.exports = imagesearchRouter