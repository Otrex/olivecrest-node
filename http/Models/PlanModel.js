
const mongoose = require('mongoose')
const moment = require('moment')
const populate = require('./plugins/populate')
const { TransactionSchema } = require('./extras/TransactionsModel')

// The Plan would Store Transactions
// Plan Schema
const PlanSchema = new mongoose.Schema({ 
	name : String,
	percentReturns : Number,
	description : String,
	features : [String]
}); 

const Plan = mongoose.model('Plan', PlanSchema)

module.exports = Plan