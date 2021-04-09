
const mongoose = require('mongoose')
const moment = require('moment')


// The Transaction would Store Transactions
// Transaction Schema
const TransactionSchema = new mongoose.Schema({ 
	type : {
		type : String
	},
	amount : {
		type : Number
	},
	timestamp : {
		type : Number,
		default : moment().format("X")
	}
}); 

TransactionSchema.static.totalCreditedBalance = function(){
	var data = this.where('type', 'credit')
	return data.reduce((total, e )=> {
		return total + e.amount
	}, 0)
}

TransactionSchema.static.totalDebitedBalance = function(){
	var data = this.where('type', 'debit')
	return data.reduce((total, e )=> {
		return total + e.amount
	}, 0)
}
const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = { Transaction, TransactionSchema }