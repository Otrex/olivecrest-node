
const CoinbaseServices = require('../../services/CoinbaseServices')
const catchAsync = require('../../services/core/CatchAsync')
const Webhook = require('coinbase-commerce-node').Webhook;


const { RequestError } = require('../../services/Exceptions');

exports.webhook = (request, response, next) => {
	try {
		let event = Webhook.verifyEventBody(
			JSON.stringify(request.body),
			request.headers['x-cc-webhook-signature'],
			process.env.COINBASE_C_WEBHOOK_SECRET
		);
		console.log(event);
		response.status(200).json({
			status: "ok",
			message: "Webhook recieved"
		})
	} catch (err) {
		console.log(err)
		throw new RequestError(err)
	}
}



exports.charge = catchAsync (async(req, res) => {
     let user = {
     	_id: 14, email: "ben@gmail.com", username: "bernard"
     }
	let event = await CoinbaseServices.createCharge(user, 12).save()
	res.status(200).json({
		status: "ok",
		event
	})
})

// // Try create and update created charge. Process result as regular callback
// firstChargeObj.save(function (error, response) {
// 	console.log('Created charge(callback)');
// 	console.log(response);
// 	console.log(error);

// 	if (response && response.id) {
// 		Charge.retrieve(response.id, function (error, response) {
// 			console.log('Retrived charge(callback)');
// 			console.log(response);
// 			console.log(error);
// 		});
// 	}
// });

// // Try create and retrieve created charge. Process result as promise
// secondChargeObj.save().then(function (response) {
// 	console.log('Created charge(promise)');
// 	console.log(response);

// 	if (response && response.id) {
// 		return Charge.retrieve(response.id);
// 	}
// }).then(function (response) {
// 	console.log('Retrieved charge(promise)');
// 	console.log(response);
// }).catch(function (error) {
// 	console.log(error);
// });