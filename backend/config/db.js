const mongoose = require("mongoose");

const URI =
  "mongodb+srv://moinmern:moin%409606@cluster0.dcrtwb1.mongodb.net/ecomsixpack?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectMongo;
