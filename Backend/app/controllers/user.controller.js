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
    role: req.body.password || "Admin"
  })
    .then(async (user) => {
      return makeResponse(res, 200, true, user, "user recorded successfully");
    })
    .catch((err) => {
      console.log("internal-error", err.message ? err.message : err)
      next(err);
    });
});

exports.signUp = asyncHandler(async (req, res) => {
  const query = {
    email: req.body.email
  }
  User.findOne(query).lean({ defaults: true })
    .then((user) => {
      if(user.password === req.body.password){
        return makeResponse(res, 200, user ? true : false, user, user ? "Specific User" : "User not found");
      }
      return makeResponse(res, 402, false, null,  "User not found");
    })
    .catch((err) => {
      console.log("internal-error", err.message ? err.message : err)
      next(err);
    });
});

exports.update = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body).lean({ defaults: true })
    .then((user) => {
      User.findOne({ _id: user._id }).then((newUser) => {
        return makeResponse(res, 200, newUser ? true : false, newUser, newUser ? "Update User" : "User not found");
      });
    })
    .catch((err) => {
      console.log("internal-error", err.message ? err.message : err)
      next(err);
    });
};

exports.findOne = (req, res, next) => {
  User.findOne({ _id: req.params.userId }).lean({ defaults: true })
    .then((user) => {
      return makeResponse(res, 200, user ? true : false, user, user ? "Specific User" : "User not found");
    })
    .catch((err) => {
      console.log("internal-error", err.message ? err.message : err)
      next(err);
    });
};

exports.findAll = (req, res, next) => {
  User.find().lean({ defaults: true })
    .then((users) => {
      return makeResponse(res, 200, true, users, "All Users");
    })
    .catch((err) => {
      console.log("internal-error", err.message ? err.message : err)
      next(err);
    });
};