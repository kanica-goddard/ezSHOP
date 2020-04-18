const express = require("express");
const router = express.Router();

//load product model
const productModel = require("../models/product");

//Route for the Home Page
router.get("/", (req, res) => {
  productModel
    .find({ isBestSeller: true })
    .then((bestSellers) => {
      const mappedBestSellers = bestSellers.map((product) => {
        return {
          id: product._id,
          productImage: product.productImage,
          description: product.description,
          quantity: product.quantity,
          productImage: product.productImage,
          category: product.category,
          price: product.price,
          isBestSeller: product.isBestSeller,
        };
      });

      res.render("general/home", {
        title: "ezSHOP",
        bestSellers: mappedBestSellers,
      });
    })
    .catch((err) =>
      console.log(`Error occured when pulling from the database :${err}`)
    );
});

module.exports = router;
