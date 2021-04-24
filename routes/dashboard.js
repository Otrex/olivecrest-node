
const _ = require("lodash")
const route = require('express').Router()

// Controllers
const WalletController = require('../http/Controllers/WalletController')

// Helpers
const catchAsync = require('../services/core/CatchAsync')

// Default Definitions
const DEF = { 
	layout: 'dashboard/layout', 
	urlHead:"/dash", title: "", 
	userPicture: "/images/faces/face2.jpg" 
}



// User Must be in req
route.get('/home', catchAsync(async(req, res)=>{
	DEF.title = "Home"

	if (!req.user) return res.redirect('/')
		
	overview = await WalletController.walletOverview(req)

	user = _.omit(req.user, ['password'])

	res.render('dashboard/index', { 
		...DEF, user, overview
	})
}))

// User Must be in req
route.get('/', catchAsync(async(req, res)=>{
	// console.log(res)
	// if (!req.user) return res.redirect('/')
	DEF.title = "Home"
	// overview = await WalletController.walletOverview(req)
	let overview = {
		availableBalance: 5000,
		investedBalance: 2000,
		referalBonus: 20,
		earnings: 5000
	}

	req.user = { username: "obisiket1", password: "xq23f" }

	user = _.omit(req.user, ['password'])

	res.render('dashboard/index', { 
		...DEF, user, overview
	})
}))


route.get('/plans', (req, res)=>{
	DEF.title = "Plans"
	req.user = { username: "obisiket1", password: "xq23f", role: {is_admin: true} }

	user = _.omit(req.user, ['password'])

	// Testing
	plans = [
		{
			_id : 1,
			name: "Gold",
			percentReturns: "50",
			features: "<li>Great</li><li>Bigger</li>",
			description: "This is the best i have ever seen"
		},
		{
			_id : 2,
			name: "Gold",
			percentReturns: "70",
			features: "<li>Great</li><li>Bigger</li>",
			description: "This is the best i have ever seen"
		},
		{
			_id : 3,
			name: "Silver",
			percentReturns: "50",
			features: "<li>Great</li><li>Bigger</li>",
			description: "This is the best i have ever seen"
		}
	]
	res.render('dashboard/plans', { ...DEF, user })
})



route.get('/profile', (req, res)=>{
	DEF.title = "Profile"
	req.user = { username: "obisiket1", password: "xq23f" }

	user = _.omit(req.user, ['password'])

	// Testing
	plans = [
		{
			name: "Gold",
			percentReturns: "50",
			features: "<li>Great</li><li>Bigger</li>",
			description: "This is the best i have ever seen"
		},
		{
			name: "Gold",
			percentReturns: "50",
			features: "<li>Great</li><li>Bigger</li>",
			description: "This is the best i have ever seen"
		},
		{
			name: "Gold",
			percentReturns: "50",
			features: "<li>Great</li><li>Bigger</li>",
			description: "This is the best i have ever seen"
		}
	]
	res.render('dashboard/profile', { ...DEF, user })
})



route.get('/pay', (req, res)=>{
	DEF.title = "Pay"
	req.user = { username: "obisiket1", password: "xq23f" }

	user = _.omit(req.user, ['password'])

	res.render('dashboard/pay', { ...DEF, user })
})


route.get('/settings', (req, res)=>{
	DEF.title = "Settings"
	req.user = { username: "obisiket1", password: "xq23f" }

	user = _.omit(req.user, ['password'])

	res.render('dashboard/settings', { ...DEF, user })
})

route.get('/support', (req, res)=>{
	DEF.title = "Support"
	req.user = { username: "obisiket1", password: "xq23f" }

	user = _.omit(req.user, ['password'])

	res.render('dashboard/support', { ...DEF, user })
})

module.exports = route