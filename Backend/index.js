const express = require("express");
const APIRouter = require("./app/routes/api.route");
require("dotenv").config({path: __dirname + '/.env'});
const cors = require("cors");



const PORT = process.env.PORT || 3005;
const app = express()


app.use(express.json());

app.use(cors());

const connectDB = require("./app/config/connect_db");
connectDB();



app.use(
  "/api",
  APIRouter
);


app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});