const Logger = require('./Logger')

class AppError extends Error {
	constructor (name, message, statusCode, logit=false){
		super()
		this.name = name || "GeneralError"
		this.message = message
		this.statusCode = statusCode
		if (logit) this.log()
	}

	log (cb = () => {}) {
		Logger.logError(this, cb)
	}
}



const publishError = (err, res) => {
	console.log(err)
	if (err.name === 'ValidationError') {
		res.status(400).json ({
			name : err.name,
			errors : err.errors,
	        status : "failed"
	    })
	    return
	}

	if (err.name === 'MongoError') {
		res.status(400).json ({
			name : "Database Access Error",
			errors : "Database Access Failed",
	        status : "failed"
	    })
	    return
	}

	res.status(err.statusCode || 400).json ({
		name : err.name,
        status: err.status || 'failed',
        message: err.message,
        // stack: err.stack
    })
}

const errorHandler = (err, req, res, next) => {
	if (process.env.APP_MODE === 'DEVELOPMENT') {
		publishError(err, res)
		next()
	}
	if (process.env.APP_MODE === 'PRODUCTION') {
		publishError(err, res)
	}
}


module.exports = {
	AppError,
	errorHandler
}