
const Event = require('./Event')

class PaymentEvent extends Event {
	constructor( user, req) {
		super(user, req)
		this.template = 'payment'
		this.role = req.role
	}
}

module.exports = PaymentEvent