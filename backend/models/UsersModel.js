const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  userName: {
    type: String,
  },

  password: {
    type: String,
  },

  email: {
    type: String,
  },
});

module.exports = mongoose.model("Users", UserModel);
