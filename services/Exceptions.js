
const { AppError } = require('./core/Exception')

class DBError extends AppError {
	constructor(message, cb) {
		super("DBError")
		this.message = message
		this.statusCode = undefined;
		this.log(cb)
		console.log(this)
	}
}

class MailError extends AppError {
	constructor(e, cb) {
		super("MailError")
		this.message = e
		this.statusCode = 500;
		this.log(cb)
		console.log(this)
	}
}

class RequestError extends AppError {
	constructor(message, statusCode=400) {
		super("RequestError")
		this.message = message
		this.statusCode = statusCode
	}
}

class JWTError extends AppError {
	constructor(message, statusCode) {
		super("JWTError")
		this.message = message
		this.statusCode = statusCode
	}
}

class ValidationError extends AppError {
	constructor(message, statusCode) {
		super("ValidationError")
		this.message = message
		this.statusCode = statusCode
	}
}

class TokenError extends AppError {
	constructor(message, statusCode) {
		super("TokenError")
		this.message = message
		this.statusCode = statusCode
	}
}

class PaymentError extends AppError {
	constructor(message = 'sorry your payment was not successful', statusCode = 400) {
		super("PaymentError")
		this.message = message
		this.statusCode = statusCode
	}
}



module.exports = {
	RequestError,
	ValidationError,
	TokenError,
	JWTError,
	DBError,
	MailError
}