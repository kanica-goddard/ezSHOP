const express = require("express"); //this imports the express package that was installed within your application
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//load the environment variable file
require("dotenv").config({ path: "./config/keys.env" });

const app = express();

//Handlebars Middleware - This tells express to set up our template engine has handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");
const userController = require("./controllers/user");

//map each controller to the app express object
app.use("/", generalController);
app.use("/product", productController);
app.use("/user", userController);

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to MongoDB Databse.")
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`))

//Sets up server - Creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Web Server Started`);
});
