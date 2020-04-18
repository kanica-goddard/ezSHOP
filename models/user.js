const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs"); //only using bcrypt in this file to encrypt passwords

//This indicates the shape of the documents that will be entering the database
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    default: "user",
  },
});

// "pre save" - this function executes right before the save method
//  behavior of pre is akin to a middleware funtcion
//  since it operates like a middleware, it requires next
userSchema.pre("save", function (next) {
  //salt random generated characters or strings
  bcrypt
    .genSalt(10) // generates 10 characters
    .then((salt) => {
      bcrypt
        .hash(this.password, salt)
        .then((encryptPassword) => {
          this.password = encryptPassword;
          next(); //commits the save and update the password
        })
        .catch((err) => console.log(`Error occured when hashing ${err}`));
    })
    .catch((err) => console.log(`Error occured when salting ${err}`));
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;

/*
    How do we encrupt the password?
        - bcrypt uses double hashing
        - uses salt that generates random texts 
        - random text generated through salt gets concatenated with your password
    What is salt?
        - randomly generated characters or strings
  */
