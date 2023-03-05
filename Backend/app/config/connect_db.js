const mongoose = require("mongoose");
const { DB_URL } = require("./config");

const connectDB = async () => {
  try {
    await mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("connected to database successfully")
      })
      .catch((err) => {
        console.log("could not connect to the database",err)
      });
  } catch (error) {
    console.log("database connection failed")
    return error;
  }
};

module.exports = connectDB;
