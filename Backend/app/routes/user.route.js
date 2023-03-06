const express = require("express");
const UserController = require("../controllers/user.controller");
const UserValidator = require("../validators/user.validator");

const UserRouter = express.Router();

UserRouter.get("/me", UserController.me);
UserRouter.post("/",UserValidator.create, UserController.createUser);
UserRouter.post("/signup", UserValidator.findBy ,UserController.signUp);
UserRouter.put("/:userId", UserValidator.create, UserController.update);
UserRouter.get("/:userId", UserController.findOne);
UserRouter.get("/", UserController.findAll);

module.exports = UserRouter;