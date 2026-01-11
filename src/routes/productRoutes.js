const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

router.get("/allproductitem", productController.getAllProductItem);

module.exports = router;