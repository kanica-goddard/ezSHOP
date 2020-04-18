const express = require("express"); //this imports the express package that was installed within your application
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');

//load the environment variable file
require("dotenv").config({ path: "./config/keys.env" });

const app = express();

//Handlebars Middleware - This tells express to set up our template engine has handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use((req,res,next)=>{

  if(req.query.method=="PUT")
  {
      req.method="PUT"
  }

  else if(req.query.method=="DELETE")
  {
      req.method="DELETE"
  }

  next();
})

app.use(fileUpload());

app.use(session({
  secret: `${process.env.SECRET_KEY}`,
  resave: false,
  saveUninitialized: true
}))

app.use((req,res,next)=>{
  //a global variable that can be handled by any handlebar file
  res.locals.user= req.session.userInfo;
  next();
})

//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");
const userController = require("./controllers/user");
const cartController = require("./controllers/cart");

//map each controller to the app express object
app.use("/", generalController);
app.use("/product", productController);
app.use("/user", userController);
app.use("/cart", cartController);

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to MongoDB Database")
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));
mongoose.set('useCreateIndex', true);

//Sets up server - Creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Web Server Started`);
});
