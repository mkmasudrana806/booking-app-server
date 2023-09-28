const mongoose = require("mongoose");
const connectMongoDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

module.exports = connectMongoDb;
