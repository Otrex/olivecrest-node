
const { RequestError } = require('../Exceptions')
const catchAsync = require('./CatchAsync')

const _getAll = async ( Model, query = {}, limit, skip ) => {
	// if (!limit || !skip) return await Model.find(query)

    return await Model.find(query)  // You may want to add a query
            .skip(skip) // Always apply 'skip' before 'limit'
            .limit(limit) // This is your 'page size'
}


exports.findAll = ( Model, query = {}) => { 
	return catchAsync( async (req, res, next) => {
		let count = await Model.estimatedDocumentCount({})
			if (req.params.type == 'paginate') {
				
				const PAGE_SIZE = parseInt(req.query.limit) || 20;// Similar to 'limit'
		        const skip = parseInt(req.query.skip) || ((req.query.page || 1) - 1) * PAGE_SIZE
		     	const result = await _getAll(Model, query, PAGE_SIZE, skip);
		     	let next = ((skip)/PAGE_SIZE) + 2
		     	if ((skip + PAGE_SIZE) >= count) next = null
		     	res.status(200).json({ 
		     		total : count, 
		     		page : ((skip)/PAGE_SIZE) + 1, 
		     		limit: PAGE_SIZE,
		     		next,
		     		result });
		     	return
			}
			res.status(200).json({ result : await _getAll(Model, query), total: count })
	   // } catch(e){
	    //  throw new RequestError({e, i:'No Users'});
	   // }
	})
}


exports.deleteOne = ( Model, query = {}) => { 
	return catchAsync( async (req, res, next) => {
		await Model.findById(req.params.id).deleteOne()
		res.status(200).json({
			message: 'Deleted Successfully',
			status: 'ok'
		})
	})
}


exports.findOne = ( Model, query = {}) => { 
	return catchAsync( async (req, res, next) => {
		let data = await Model.findById(req.params.id)
		res.status(200).json({data})
	})
}


exports.updateOne = ( Model, query = {}) => { 
	return catchAsync( async (req, res, next) => {

		await Model.findById(req.params.id).updateOne({
			...req.body
		})

		res.status(200).json({
			message: 'Updated Successfully',
			status: 'ok'
		})
	})
}


exports.createOne = ( Model, query = {}) => { 
	return catchAsync( async (req, res, next) => {
		Model.create({
			...req.body
		})
		res.status(200).json({
			message: 'Created Successfully',
			status: 'ok'
		})
	})
}




	