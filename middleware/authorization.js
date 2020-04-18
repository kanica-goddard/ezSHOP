const productModel = require("../models/product");

const dashBoardLoader = (req, res) => {
  if (req.session.userInfo.type == "clerk") {
    productModel
      .find()
      .then((products) => {
        const mappedProducts = products.map((product) => {
          return {
            id: product._id,
            productName: product.productName,
            description: product.description,
            quantity: product.quantity,
            productImage: product.productImage,
            category: product.category,
            price: product.price,
            isBestSeller: product.isBestSeller,
          };
        });

        res.render("users/clerkDashboard", {
          title: "ezSHOP | Products",
          data: mappedProducts,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.render("users/userDashboard");
  }
};

module.exports = dashBoardLoader;
