const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authentication");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const cartModel = require("../models/cart"); //load cart model
const productModel = require("../models/product"); //load product model

//TODO: add to cart + update existing cart

//TODO: Show error when cart is empty

//TODO: Place order + send email to logged-in user, indicating: all products in cart, quantity amount, total

router.get("/add", isAuthenticated, (req, res) => {});

router.post("/add", isAuthenticated, (req, res) => {
  // find if product is already in the cart
  cartModel
    .findOne({ productID: req.body.id })
    .then((cartItem) => {
      if (cartItem) {
        console.log("Cart item exists — adding to quantity only");

        const newQuantity = cartItem.quantity + parseInt(req.body.quantity);
        //TODO: check amount in stock

        cartItem.quantity = newQuantity;
        cartItem.save();
      } else {
        console.log("Get product info and create new cart item");

        productModel.findById(req.body.id).then((product) => {
          //create new cart item
          const newCartItem = {
            productID: req.body.id,
            productName: product.productName,
            price: product.price,
            quantity: req.body.quantity,
            productImage: product.productImage,
          };
          const cartItem = new cartModel(newCartItem);

          cartItem.save();
        });
      }
    })
    .catch((err) => {
      console.log("Error occurred: " + err);
    });

  // go back to product page
  res.redirect(`/product/view/${req.body.id}`);
});

module.exports = router;
