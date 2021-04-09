
const Event = require('./Event')

class CostAttainedEvent extends Event {
	// Note User == Project
	constructor( user ) {
		super(user)
		this.template = 'costAttained'
	}
}

module.exports = CostAttainedEvent