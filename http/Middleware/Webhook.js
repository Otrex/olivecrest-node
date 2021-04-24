

exports.rawBody = (req, res, next) => {
	req.setEncoding('utf8');

	// var data = '';

	// req.on('data', function (chunk) {
	// 	data += chunk;
	// });

	// req.on('end', function () {
	// 	req.rawBody = data;

	// 	next();
	// });
	next(null, req)
}