const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

router.get("/allproductitem", productController.getAllProductItem);
router.get("/getcategoryproduct", productController.getCategoryProduct);

module.exports = router;