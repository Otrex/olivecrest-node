
const Event = require('./Event')

class ResetPasswordEvent extends Event {
	constructor( user, req) {
		super(user, req)
		this.template = 'resetPassword'
		this.role = req.role
		user.createPasswordResetToken()
	}
}

module.exports = ResetPasswordEvent