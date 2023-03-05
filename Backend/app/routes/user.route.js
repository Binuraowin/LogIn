const express = require("express");
const UserController = require("../controllers/user.controller");

const UserRouter = express.Router();

UserRouter.get("/me", UserController.me);
UserRouter.post("/", UserController.createUser);
UserRouter.post("/signup", UserController.signUp);

module.exports = UserRouter;