module.exports = (data) => `
	<h1> Payment Successful </h1>
	<p> Dear user ${JSON.stringify(data)} your registeration has been Successful</p>
	<small> &copy; ${data.app_name} </small>
`