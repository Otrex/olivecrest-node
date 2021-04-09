
const { validate, ValidationError, Joi } = require('express-validation')
const catchAsync = require('./core/CatchAsync')

const RegisterValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

const LoginValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

exports.RegisterValidator = catchAsync (async (req, res, next) => {
	  await validate(RegisterValidation, {}, {})
    next()
})

exports.LoginValidator = catchAsync (async (req, res, next) => {
  	await validate(LoginValidation, {}, {})
    next()
})