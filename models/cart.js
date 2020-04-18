const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
const cartSchema = new Schema({
  productID: {
    type: Schema.Types.ObjectId, //foreign key - referencing objectID of a product in product schema
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
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
const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
