const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  isBestSeller: {
    type: Boolean,
    required: true,
  },

  productImage: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

//Implementing this model allows us to perform CRUD operations
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
