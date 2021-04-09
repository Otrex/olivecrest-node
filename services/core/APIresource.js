
const TemplateAPI = require('./TemplateAPI')

class _APIresource {
	middlewares = {
		findAll : [],
		findOne : [],
		updateOne : [],
		deleteOne : [],
		createOne : [],
	}
	constructor(name, model, route) {
		this.route = route || require('express').Router()
		this.model = model
		this.name = name
	}

	middleware(ware, applyto = '*'){
		if (applyto == '*'){
			this.middlewares.findOne.push(ware)
			this.middlewares.findAll.push(ware)
			this.middlewares.updateOne.push(ware)
			this.middlewares.createOne.push(ware)
			this.middlewares.deleteOne.push(ware)
		}

		if (applyto.isArray()) {
			applyto.forEach( e => {
				this.middlewares[e].push(ware)
			})
		}
		return this
	}
	generate(){
		this.route.get(`/${this.name}/:type`, ...this.middlewares.findAll, TemplateAPI.findAll(this.model))
		this.route.get(`/${this.name}/get/:id`, ...this.middlewares.findOne,  TemplateAPI.findOne(this.model))
		this.route.put(`/${this.name}/update/:id`, ...this.middlewares.updateOne, TemplateAPI.updateOne(this.model))
		this.route.post(`/${this.name}/create`, ...this.middlewares.createOne, TemplateAPI.createOne(this.model))
		this.route.delete(`/${this.name}/delete/:id`, ...this.middlewares.deleteOne,  TemplateAPI.deleteOne(this.model))

		return this.route
	}
}


exports.with = (name, model, route) => {
	return new _APIresource(name, model, route)
}