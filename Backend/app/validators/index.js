const Joi = require("joi");

exports.performValidator = async (joiObject, data) => {
  const schema = Joi.object(joiObject);
  try {
    const value = await schema.validateAsync(data);
    return {
      success: true,
      data: value,
    };
  } catch (err) {
    console.log(err.details[0].message.replace(/\"/g, ""));
    const errorDetails = err.details || [];
    errorDetails.forEach((d) => {
      delete d.path;
      delete d.type;
      delete d.context;
    });
    return {
      success: false,
      data: errorDetails,
    };
  }
};
