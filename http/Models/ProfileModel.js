

const mongoose = require('mongoose')

const { Wallet } = require('./WalletModel')

const ProfileSchema = new mongoose.Schema({
	dateofbirth: {
		type: Date,
		required: false
	},
	country: {
		type: String,
		required: false
	},
	address: {
		type: String,
		required: false
	},
	website: {
		type: String,
		required: false
	},

	wallet: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
	},
	updated_at: {
		type: Date,
		default: null
	},
})

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile