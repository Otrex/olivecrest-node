
const _ = require('lodash')
const randomstring = require("randomstring");
const Token = require('../Models/extras/TokenModel')
const Event = require('./Event')
const moment = require('moment')

class LoginEvent extends Event {

	constructor( user, req ) {
		super(user, req)
		this.template = 'accessToken'
		this.subject = "ACCESS TOKEN"
	}

	async generateToken () {
		let token = Math.floor(Math.random() * 100000) + 1;

		let tokenDB = await Token.findOne({user_id: this.user_id});

		if (!tokenDB) tokenDB = await Token.create({ user_id: this.user._id })

		tokenDB.token = token

		await tokenDB.save()

		this.data.token = token

		return this
	}
}

module.exports = LoginEvent