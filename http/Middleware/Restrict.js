
const { RequestError } = require('../../services/Exceptions')
const catchAsync = require('../../services/core/CatchAsync')

// Must be Authenticated to use this
exports.to = (role) => {
	return catchAsync(async (req, res, next) => {

		if (req.user.role){
			if (req.user.role.admin && role.admin ) return next(null, req)
		} else {
			if (!req.user.role && role.user) return next(null, req) 
		}
		throw new RequestError(
			{
				info: 'Access Denied',
				reason: `Admin Only Route`
			}, 401)
	})
}
