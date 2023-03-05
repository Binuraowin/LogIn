const express = require("express");
const UserRouter = require("./user.route");

const APIRouter = express.Router();

APIRouter.use("/users",UserRouter);

module.exports = APIRouter;
