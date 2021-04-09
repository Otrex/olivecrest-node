
const mongoose = require('mongoose')
const moment = require('moment')
const populate = require('./plugins/populate')
const { TransactionSchema } = require('./extras/TransactionsModel')

// The wallet would Store Transactions
// Wallet Schema
const WalletSchema = new mongoose.Schema({ 
	type : {
		type : String
	},
	payedIn : {
		type : Number,
		default : 0
	},
	invested : {
		type : Number,
		default : 0
	},
	transactions : [TransactionSchema]
}); 

// WalletSchema.plugin(populate(['transactions']))
WalletSchema.methods.availableBalance = function(){
	return this.payedIn - this.invested
}
const Wallet = mongoose.model('Wallet', WalletSchema)

module.exports = Wallet