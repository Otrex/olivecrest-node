
const _ = require('lodash')
const randomstring = require("randomstring");
const { RequestError } = require('../../services/Exceptions')
const Profile = require('../Models/ProfileModel')
const Wallet = require('../Models/WalletModel')
const Role = require('../Models/extras/RoleModel')
const Event = require('./Event')
const moment = require('moment')

class RegistrationEvent extends Event {

	constructor( user, req ) {
		super(user, req)
		this.template = 'registration'
		this.subject = "REGISTRATION SUCCESSFUL"
		this.role = req.role
		this.body = _.omit(req.body, ['email', 'username', 'password', 'rpassword'])
	}

	async setRole () {
		if (this.role) {
			if (this.role === 'admin') this.user.role = await Role.create({admin: true})
		}
		return this
	}

	async setUpUser () {
		this.setUpVerificationCode()
		await this.setRole()

		this.user.profile = await Profile.create({
			...this.body
		})

		this.user.wallet = await Wallet.create({})

		await this.user.save()
		return this
	}

	setUpVerificationCode() {
	    this.user.verificationCode = randomstring.generate();
	    this.user.verificationCodeExpires = moment().add((24*7), "hours").format();
		return this
	}
}

module.exports = RegistrationEvent