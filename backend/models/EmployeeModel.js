const mongoose = require("mongoose");

const EmploySchema = new mongoose.Schema({
  Image: {
    type: String,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Mobile: {
    type: String,
  },
  Designation: {
    type: String,
  },
  gender: {
    type: String,
  },
  Course: {
    type: String,
  },
  Createdate: {
    type: Date,
    default: Date.now,
  },

  AdminRefrel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Employee", EmploySchema);
