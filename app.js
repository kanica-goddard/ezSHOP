const express = require("express"); //this imports the express package that was installed within your application
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
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

//map each controller to the app express object
app.use("/", generalController);
app.use("/product", productController);

//Sets up server - Creates an Express Web Server that listens to HTTP Reuqest on port 3000
const PORT = 3090;
app.listen(PORT, () => {
  console.log(`Web Server Started`);
});
