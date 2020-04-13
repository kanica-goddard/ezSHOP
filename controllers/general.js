const express = require('express')
const router = express.Router();

//load product model
const productModel = require("../models/product");

//Route for the Home Page
router.get("/", (req, res) => {
  res.render("general/home", {
    title: "ezSHOP",
    bestSellers: productModel.getBestSellingProducts()
  });
});

module.exports = router;
