const mongoose = require("mongoose");

console.log("db.js file loaded");

const connectDB = async () => {
  console.log("Inside connectDB");

  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;