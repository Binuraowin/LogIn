const asyncHandler = require("../middleware/async");
const { makeResponse } = require("../helpers/make_response");
const User = require("../models/user.model");


exports.me = asyncHandler(async (req, res) => {
  console.log("response")
  // res.status(200).send({name:"hi"})
});

exports.createUser = asyncHandler(async (req, res) => {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  })
    .then(async (user) => {
      return makeResponse(res, 200, true, user, "user recorded successfully");
    })
    .catch((err) => {
      apiErrorLogger.error({
        type: "internal-error",
        message: err.message ? err.message : err,
        success: false,
      });
      next(err);
    });
});

exports.signUp = asyncHandler(async (req, res) => {

});