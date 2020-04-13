const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

//load product model
const productModel = require("../models/product");

//Route for the Login
router.get("/login", (req, res) => {
  res.render("users/login", {
    title: "ezSHOP | Login",
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
      message: `Welcome ${uname}!`,
    });
  }
  //Errors
  else {
    res.render("users/login", {
      title: "ezSHOP | Login",
      errors: errorMessages,
    });
  }
});

//Route for the Sign-up
router.get("/sign-up", (req, res) => {
  res.render("users/sign-up", {
    title: "ezSHOP | Sign Up",
  });
});

//Route to process user's request and data when user submits registration form
router.post("/sign-up", (req, res) => {
/*
    RULES when inserting: 
    - create an instance
    - pass the data submitted throrough the form in the form of an object
    - call the save method
*/
  const newUser = 
  {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:req.body.password
  }
// Create instance of the user model 
  const user = new userModel(newUser);
  user.save()
  .then(()=>{
    res.redirect("./controllers/general/home");
  })
  .catch(err=>console.log(`Error while inserting into the data ${err}`));


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
    //sending email
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
      to: `${email}`,
      from: `kanika-k@hotmail.com`,
      subject: "Registration Completed",
      html: `Vistor's Full Name ${firstName} ${lastName} <br>
     Vistor's Email Address ${email} <br>
    `,
    };

    //Asynchornous operation (who don't know how long this will take to execute)
    sgMail
      .send(msg)
      .then(() => {
        res.render("general/home", {
          title: "ezSHOP",
          bestSellers: productModel.getBestSellingProducts(),
          message: `Registration succesful. Hello ${firstName}, Welcome to ezSHOP!`,
        });
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
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
