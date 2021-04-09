
const Wallet = require('../Models/WalletModel')
const walletService = require('../../services/WalletService')

// Helpers
const catchAsync = require('../../services/core/CatchAsync')
const { RequestError } = require('../../services/Exceptions')


// API route/Controller
exports.walletOverview = catchAsync(async (req, res, next) => {
	response = {}

	req.user.populate(['wallet'])
	let wallet = req.user.wallet;

	response.availableBalance = wallet.availableBalance()
	response.investedBalance = wallet.invested
	response.referalBonus = walletService.referalBonus(wallet)
	response.earnings = walletService.earnings(wallet)

	res.status(200).json({
		data : response,
		status : "ok"
	})
})



exports.walletOverview = async (req) => {
	response = {}

	await req.user.populate(['wallet'])
	let wallet = req.user.wallet;

	response.availableBalance = wallet.availableBalance()
	response.investedBalance = wallet.invested
	response.referalBonus = walletService.referalBonus(wallet)
	response.earnings = walletService.earnings(wallet)

	return response
}
