
const User = require('../Models/UserModel')

const catchAsync = require('../../services/core/CatchAsync')
const { RequestError } = require('../../services/Exceptions')

exports.Admin = {
	Add : function(req, res, next){
		req.role = 'admin'
		next(null, req)
	},
	Verify : function(){}
}


// exports.check = catchAsync (async (req, res, next) => {
// 	let user = await User.findOne({ email : req.body.email })
// 	if (!user) throw new RequestError('Authentication Failed', 401);
// 	if (user.role) {
// 		if(user.role.admin) {
// 			req.role = 'admin'
// 			next(null, req)
// 		}
// 	} 
// 	next()
// })
