// Router Init
const route = require('express').Router()

// Middlewares
const Role = require('../http/Middleware/Role')
const Verify = require('../http/Middleware/Verify')

// Controllers
const AuthController = require('../http/Controllers/AuthController')

// Validators
const { RegisterValidator, LoginValidator } = require('../services/Validations');


/* AUTH ROUTES */
// Register
route.post('/register', RegisterValidator, AuthController.register)
route.post('/admin/register', RegisterValidator, Role.Admin.Add, Verify.headerCredentials, AuthController.register)


// Login
route.post('/login', LoginValidator, AuthController.login)
route.post('/admin/login', LoginValidator, Role.Admin.Add,  AuthController.login)


// PasswordReset
route.get('/pwtoken', AuthController.getPasswordResetToken)//sends token url to email
route.post('/password-reset', Verify.resetToken, AuthController.resetPassword)


//Verify Email Token
route.get('/verify/:id/:token', AuthController.verify)

//Verify Email Token
route.get('/logout', AuthController.logout)

module.exports = route