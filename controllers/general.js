const express = require("express");
const router = express.Router();

//load product model
const productModel = require("..models/product");

//Route for the Home Page
router.get("/", (req, res) => {
  res.render("general/home", {
    title: "ezSHOP",
    bestSellers: productModel.getBestSellingProducts()
  });
});

//Route for the Login
router.get("/login", (req, res) => {
  res.render("general/login", {
    title: "ezSHOP | Login"
  });
});
//Route for the Sign-up
router.get("/sign-up", (req, res) => {
  res.render("general/sign-up", {
    title: "ezSHOP | Sign Up"
  });
});

module.exports = router;
