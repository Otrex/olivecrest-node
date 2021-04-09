
const route = require('express').Router()
const APIresource = require('../services/core/APIresource')
const User = require('../http/Models/UserModel')

// User APIresoures
/*
	GET /:resourcename/:type   type = all | paginate
	GET /:resourcename/get/:id
	PUT /:resourcename/update/:id
	POST /:resourcename/create
	DELETE /:resourcename/delete/:id
*/
APIresource.with('users', User , route).generate()

module.exports = route