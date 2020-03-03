const express = require("express"); //this imports the express package that was installed within your application

const app = express(); // this creates your express app object

const exphbs = require("express-handlebars");

const productModel = require("./model/product");

//This tells express to set up our template engine has handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

//Route for the Home Page
app.get("/", (req, res) => {
  res.render("home", {
    title: "ezSHOP",
    bestSellers: productModel.getBestSellingProducts()
  });
});
//Route for Products
app.get("/products", (req, res) => {
  res.render("products", {
    title: "ezSHOP | Products",
    products: productModel.getAllProducts()
  });
});
//Route for the Login
app.get("/login", (req, res) => {
  res.render("login", {
    title: "ezSHOP | Login"
  });
});
//Route for the Sign-up
app.get("/sign-up", (req, res) => {
  res.render("sign-up", {
    title: "ezSHOP | Sign Up"
  });
});
const PORT = 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT, () => {
  console.log(`Web Server Started`);
});
