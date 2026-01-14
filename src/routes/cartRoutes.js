const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController")

router.post("/addproducttocart", cartController.addProductToCart);
router.get("/getallcartbyemail", cartController.getAllCartByEmail);

module.exports = router;