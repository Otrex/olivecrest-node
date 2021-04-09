const MailTemplate = require('../../services/core/MailTemplate')
const Mail = require('../../providers/email')
const { MailError } = require('../../services/Exceptions')

class Event {
	
	constructor( user, req ) {
		this.template = undefined
		this.user = user
		this.req = req
		this.subject = undefined
		this.data = {
			user : this.user,
			app_name : process.env.APP_NAME,
		}
	}

	async sendMail( template, data, options={} ){
		try {
			this.data = {
				...this.data, ...data
			}

			let templateXX = new MailTemplate( template || this.template, this.data  )

			templateXX = await templateXX.get()

			this.options = {
				from : `<${process.env.APP_NAME} ${process.env.APP_EMAIL} >`,
				subject : this.subject,
				email : this.user.email,
				message : templateXX,
				...options,
			}
		
			await Mail(this.options)
			
		} catch (err) {
			if (err) throw new MailError(err)
		}	
	}
}

module.exports = Event