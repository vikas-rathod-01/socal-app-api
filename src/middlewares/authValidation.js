const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().min(6).trim().required().messages({
    "string.min": `password length must be at least 6 characters long`,
  }),
  confirmPassword: joi
    .string()
    .trim()
    .valid(joi.ref("password"))
    .required()
    .messages({
      "any.only": `Password and confirm Password must be same`,
    }),
});

const loginSchema = joi.object({
  email: joi.string().email().trim().lowercase().required().messages({
    "string.email": `Email must be a valid email address`,
    "string.empty": `Email is required`,
  }),
  password: joi.string().trim().required().messages({
    "string.empty": "Password is required",
  }),
});

const userValidation = async (req, res, next) => {
  return await validationHelper(req.body, res, next, userSchema);
};

const loginValidation = async (req, res, next) => {
  return await validationHelper(req.body, res, next, loginSchema);
};

const validationHelper = async (body, res, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  try {
    const { error, value } = await schema.validate(body, options);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Oops, Something went wrong. please try again",
    });
  }
};
module.exports = { userValidation, loginValidation };

// lastName: joi.string().required(),
// mobile: joi
//   .string()
//   .regex(/^[0-9]{10}$/)
//   .messages({
//     "string.pattern.base": `Phone number must have 10 digits.`,
//     "string.empty": `mobile number is required`,
//   })
//   .required(),
// dob: joi.date().required(),
