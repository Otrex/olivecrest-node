module.exports = (data) => `
	<h1> Donation Completed </h1>
	<p> Dear User, ${JSON.stringify(data)} your registeration has been Successful</p>
	<small> &copy; ${data.app_name} </small>
`