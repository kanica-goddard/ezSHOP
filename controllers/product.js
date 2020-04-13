const express = require("express");
const router = express.Router();

// //load product model
const productModel = require("../models/product");

//Route for Products
router.get("/product-list", (req, res) => {
  res.render("products/product-list", {
    title: "ezSHOP | Products",
    products: productModel.getAllProducts(),
  });
});

module.exports = router;
