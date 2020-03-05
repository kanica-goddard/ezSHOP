const express = require("express");
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

//Route for the Login
router.get("/login", (req, res) => {
  res.render("general/login", {
    title: "ezSHOP | Login"
  });
});

router.post("/login", (req, res) => {
  const errorMessages = [];

  //Validation
  if (req.body.uname == "") {
    errorMessages.push("You must enter a username");
  }

  if (req.body.psw == "") {
    errorMessages.push("You must enter a password");
  }

  //No Errors
  if (errorMessages.length == 0) {
    const { uname, psw } = req.body; //destructuring

    res.render("general/home", {
      title: "ezSHOP",
      bestSellers: productModel.getBestSellingProducts(),
      message: `Welcome ${uname}!`
    });
  }
  //Errors
  else {
    res.render("general/login", {
      title: "ezSHOP | Login",
      errors: errorMessages
    });
  }
});

//Route for the Sign-up
router.get("/sign-up", (req, res) => {
  res.render("general/sign-up", {
    title: "ezSHOP | Sign Up"
  });
});

router.post("/sign-up", (req, res) => {
  const errorMessages = [];
  const { name, email, password } = req.body; //destructuring

  //Null validation
  if (name == "") {
    errorMessages.push("You must enter a name");
  }

  if (email == "") {
    errorMessages.push("You must enter an email");
  }

  if (password == "") {
    errorMessages.push("You must enter a password");
  }
  // Password length check
  const lengthRegex = /^.{6,12}$/;
  if (lengthRegex.test(password) == false) {
    errorMessages.push("Password must be between 6 to 12 characters");
  }

  // Password char check
  const charRegex = /^[a-zA-Z0-9_]+$/;
  if (charRegex.test(password) == false) {
    errorMessages.push("Password must only contain letters and numbers");
  }

  //No Errors
  if (errorMessages.length == 0) {
    //sending email
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
      to: `${email}`,
      from: `kanika-k@hotmail.com`,
      subject: "Registration Completed",
      html: `Vistor's Full Name ${name} <br>
     Vistor's Email Address ${email} <br>
    `
    };

    //Asynchornous operation (who don't know how long this will take to execute)
    sgMail
      .send(msg)
      .then(() => {
        res.render("general/home", {
          title: "ezSHOP",
          bestSellers: productModel.getBestSellingProducts(),
          message: `Registration succesful. Hello ${name}, Welcome to ezSHOP!`
        });
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  }
  //Errors
  else {
    res.render("general/sign-up", {
      title: "ezSHOP | Sign Up",
      name: name,
      email: email,
      password: password,
      errors: errorMessages
    });
  }
});

router.get("/product-list", (req, res) => {
  res.render("products/product-list", {
    title: "ezSHOP | Products",
    products: productModel.getAllProducts()
  });
});

module.exports = router;
