const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const productModel = require("../models/product");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/authentication");
const dashBoardLoader = require("../middleware/authorization");

/****** GET Route for the Login ******/
router.get("/login", (req, res) => {
  res.render("users/login", {
    title: "ezSHOP | Login",
  });
});

/****** LOGIN POST ROUTE ******/
router.post("/login", (req, res) => {
  //array to store error messages
  const errorMessages = [];
  let form = {
    email: req.body.email,
    password: req.body.password,
  };
  //Validation
  if (req.body.email == "") {
    errorMessages.push("You must enter a username");
  }

  if (req.body.password == "") {
    errorMessages.push("You must enter a password");
  }

  /**
  step 1: search to see if the email exists
  step 2: search to see it the password that the user entered matches the encrypted 
  password in the database
**/

  //No Errors
  if (errorMessages.length > 0) {
    const { email, password } = req.body; //destructuring

    res.render("general/home", {
      title: "ezSHOP",
      bestSellers: productModel.getBestSellingProducts(),
      message: `Welcome ${email}!`,
    });
  }
  //Errors
  else {
    /*Session based authentication */
    userModel
      .findOne({ email: form.email })
      .then((user) => {
        //Matching email could not be found
        if (user == null) {
          errorMessages.push("Sorry, your email or password is wrong!");
          res.render("users/login", {
            title: "Login",
            errors: errorMessages,
            retain: form,
          });
        }
        //Matching email found
        else {
          bcrypt
            .compare(form.password, user.password)
            .then((isMatched) => {
              //Password matches
              if (isMatched == true) {
                req.session.userInfo = user;
                res.redirect("/user/profile");
              }
              //Error - passwords do not match
              else {
                errorMessages.push("Sorry, your email or password is wrong!");
                res.render("users/login", {
                  title: "ezSHOP | Login",
                  errors: errorMessages,
                  retain: form,
                });
              }
            })
            .catch((err) => console.log(`Error ${err}`));
        }
      })
      .catch((err) => console.log(`Error ${err}`));
  }
});

// Handle dashboard only if authenticated
router.get("/profile", isAuthenticated, dashBoardLoader);

//destroy session
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/user/login");
});

/****** SIGN UP GET ROUTE ******/
router.get("/sign-up", (req, res) => {
  res.render("users/sign-up", {
    title: "ezSHOP | Sign Up",
  });
});

/****** SIGN UP POST ROUTE ******/
//Process user's request and data when user submits registration form
router.post("/sign-up", (req, res) => {
  /*
    RULES when inserting: 
    - create an instance
    - pass the data submitted throrough the form in the form of an object
    - call the save method
*/
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  /****** ERROR VALIDATION *****/
  const errorMessages = [];
  const { firstName, lastName, email, password } = req.body; //destructuring

  //Null validation
  if (firstName == "") {
    errorMessages.push("You must enter a first name");
  }
  if (lastName == "") {
    errorMessages.push("You must enter a last name");
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
    // Create instance of the user model
    const user = new userModel(newUser);
    user
      .save()
      .then(() => {
        //sending email
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
          to: `${email}`,
          from: `kanika-k@hotmail.com`,
          subject: "Registration Completed",
          html: `Hello ${firstName} ${lastName}! Welcome to ezShop.<br>
                 You have succesfully completed your registration. <br>
                 Your username is: ${email} <br>`,
        };
        //Asynchornous operation
        sgMail
          .send(msg)
          .then(() => {
            res.redirect("/user/userDashboard"); //, {
            // title: "ezSHOP",
            // bestSellers: productModel.getBestSellingProducts()
            //message: `Registration succesful. Hello ${firstName}, Welcome to ezSHOP!`,
            //});
          })
          .catch((err) => {
            console.log(`Error ${err}`);
          });
        console.log(`Succesfully sent registration email`);
      })
      .catch((err) =>
        console.log(`Error while inserting into the data ${err}`)
      );
  }
  //Errors
  else {
    res.render("users/sign-up", {
      title: "ezSHOP | Sign Up",
      name: firstName,
      email: email,
      password: password,
      errors: errorMessages,
    });
  }
});

module.exports = router;
