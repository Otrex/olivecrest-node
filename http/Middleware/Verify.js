
const User = require('../Models/UserModel')
const { RequestError, JWTError } = require('../../services/Exceptions')
const catchAsync = require('../../services/core/CatchAsync')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.resetToken = catchAsync(async (req, res, next) => {
	let { email, token } = req.body
	let user = await User.findOne({email})
	if (!user) throw new RequestError('Request Not Found')
	if (new Date(user.passwordResetExpires) < new Date()) throw new RequestError('Reset Code has expired')
	if (user.passwordResetToken != token) throw new RequestError('Token Doesnt Match')
    user.passwordResetExpires = '2010'
	req.user = user
	next(null, req)
})

const authenticateHeaderCredentials = (credentials) => {
    let { username , password } = credentials
    if (username !== process.env.APP_NAME && password !== process.env.APP_KEY) {
        throw new RequestError('Header Authorization Failed', 401)
    }
}

exports.headerCredentials = catchAsync(async (req, res, next) => {

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        throw new RequestError('Missing Authorization Header', 401)
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':')
    authenticateHeaderCredentials({ username, password })
    next()
})

exports.authenticated = catchAsync(async (req, res, next) => {
	let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1] 
    }

    if(!token) throw new RequestError(`User Not Authenticated`, 401)

    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET) 

    const currentUser= await User.findById(decodedToken.id);
    
    if(!currentUser) throw new JWTError(`User bearing this token does not exist.`, 401)

    if (currentUser.isVerified === false) throw new RequestError('User Not Verified', 400)

    //check if the user change password
    // if(currentUser.changedPasswordAfter(decodedToken.iat)){
    //     return next(new AppError(`user just currently changed password... try again`, 401))
    // }

    req.user = currentUser;
    next(null, req); 
})
