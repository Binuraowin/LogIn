const { performValidator } = require(".");
const { makeResponse } = require("../helpers/make_response");
const Joi = require("joi");
const NewJoi = require("joi-oid");
const User = require("../models/user.model");

exports.create = async (req, res, next) => {
  const result = await performValidator(
    {
      first_name: Joi.string().required(),
      last_name: Joi.string().optional().allow(null),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
        password: Joi.string().required(),

    },
    req.body,
  );
  if (result.success) {
    const emailUser = await User.findOne({ email: req.body.email });
    if (emailUser) {
      return makeResponse(res, 422, false, [{ message: "Email already exists" }], "Validation Errors");
    }
    next();
  } else {
    return makeResponse(res, 422, false, result.data, "Validation Errors");
  }
};

exports.findBy = async (req, res, next) => {
  const result = await performValidator(
    {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .optional(),
        password: Joi.string().optional(),
    },
    req.query,
  );
  if (result.success) {
    next();
  } else {
    return makeResponse(res, 422, false, result.data, "Validation Errors");
  }
};

