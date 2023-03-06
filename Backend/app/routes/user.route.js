const express = require("express");
const UserController = require("../controllers/user.controller");
const UserValidator = require("../validators/user.validator");

const UserRouter = express.Router();

UserRouter.get("/me", UserController.me);
UserRouter.post("/",UserValidator.create, UserController.createUser);
UserRouter.post("/signup", UserValidator.findBy ,UserController.signUp);

module.exports = UserRouter;