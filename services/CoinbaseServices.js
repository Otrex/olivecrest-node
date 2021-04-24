const _ = require("lodash")
const Charge = require('coinbase-commerce-node').resources.Charge;

exports.createCharge = (user, amount) =>{
	let userdata = _.pull(user, ['_id', 'username', 'email'])
	return new Charge({
		description: "Olivecrest Investment",
		metadata: {
			...userdata
		},
		name: "Olivecrest",
		payments: [],
		pricing_type: "no_price"
	})
}
