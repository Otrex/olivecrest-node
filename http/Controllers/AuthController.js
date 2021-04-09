

// Model
const User = require('../Models/UserModel')

// Helpers
const catchAsync = require('../../services/core/CatchAsync')
const { RequestError } = require('../../services/Exceptions')

// Events
const LoginEvent = require('../Events/LoginEvent')
const RegisterationEvent = require('../Events/RegistrationEvent')
const ResetPasswordEvent = require('../Events/ResetPasswordEvent')

// Cookie Option Response
const cookieOptions = {
    expires: new Date(Date.now() + parseInt(process.env.APP_COOKIE_EXPIRES_IN)),
  	httpOnly: false
}

// Register
exports.register = catchAsync(async (req, res, next) => {
	let { username, password, email } = req.body

	let user = await User.findOne({email})

	if ( user ) throw new RequestError("User Already Exist", 400)

	user = await User.create({
		username, password, email
	})

	if (!user) throw new RequestError("User Creation Failed", 401)

	let event = new RegisterationEvent(user, req)
	
	await event.setUpUser()

	await event.sendMail()

	res.status(200).json({
		status : 'ok',
		message : 'Proceed to verify your Account',
		user
	})
})

// Login 
exports.login = catchAsync(async (req, res, next) => {

	let { email, password } = req.body

	let user = await User.findOne({email});

	// Check If User Exist
	if (!user ) throw new RequestError("User Does Not Exist", 404)
		
	if (await user.comparePassword(password, user.password)) throw new RequestError("Password is Incorrect", 400)

	// Create JWToken
	let token = user.signinToken()

	let event = new LoginEvent(user, req)

	if (!user.role) await event.generateToken()

	await event.sendMail();

    //creating a cookie to send to client
    if(process.env.APP_MODE ==='PRODUCTION') cookieOptions.secure= true;

    res.cookie('jwt', token, cookieOptions)

	res.status(200).json({
		status : 'ok',
		message : 'User Authenticated',
		jwt : token
	})
})


// Send Reset Token
exports.getPasswordResetToken = catchAsync(async ( req, res, next) => {

	let { email } = req.query

	let user = await User.findOne({email})

	if (!user) throw new RequestError('User Not Found', 400)

	user.createPasswordResetToken();

	await user.save()

	new ResetPasswordEvent(user , req).sendMail()

	res.status(200).json({
		status : 'ok',
		message : 'Reset Token Has been sent to Email'
	})
})

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
	if (!req.user) throw new RequestError('User Not Authorized')
	let { password } = req.body
	req.user.password = password
	req.user.save()
	res.status(200).json({
		status : 'ok',
		message : 'Password Reset Successful, Proceed to login'
	})
})


// Verify Email Token
exports.verify = catchAsync(async (req, res, next) => {
	let { id, token } = req.params;

	let user = await User.findById(id)

	if (!user) throw new RequestError ("No User Found", 400)

	if (user.verificationCode  !== token) throw new RequestError ("Token Doesn't Match", 400)

	if (new Date(user.verificationCodeExpires) < new Date()) throw new RequestError ({info :"Token Has Expired", at:user.verificationCodeExpires}, 400)

	user.isVerified = true

	user.verificationCodeExpires = '2000'

	await user.save()

	 res.status(200).json({
		status : 'ok',
		message : 'Verification Successful'
	})

})


exports.logout = (req, res)=>{
	res.redirect("/")
}