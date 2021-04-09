const ejs = require('ejs')
const path = require('path')

class MailTemplate {
	constructor (template, data) {
		this.template = template 
		this.data = data
	}

	async get() {
		let template = await ejs.renderFile(path.join(__dirname, '../../views/email/' + this.template + ".ejs"), {data: this.data})
		return template
	}
}

module.exports = MailTemplate