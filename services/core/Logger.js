const path = require('path')
const fs = require('fs')
const moment = require('moment')

const logger = {
	path : path.join(__dirname, `../../storage/logs/log.txt`),
	
	logError : function (err, cb) {
		this.log(err, cb)
	},
	log : function (message, cb) {
		var now = moment()
		if (typeof message === 'string') {
			var data = `:: MESSAGE: ${now} ::: ${message}\n`
		} else {
			var data = `:: ${message.name}: ${now} ::: ${message.message}\n`
			if (message.stack) data +=message.stack
		}
		fs.appendFile(this.path, data, function(err){
			if (cb) cb()
			if (err) console.log(":::ALERT:::Logger Failed to log")
		})
	}
}


module.exports = logger