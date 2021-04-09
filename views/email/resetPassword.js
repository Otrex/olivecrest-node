module.exports = (data) => `
	<h1> Hi Visit Here to Reset Passowrd </h1>
	<p> Dear user ${data.user.username}</p>
	<p> Your Reset Token is: ${data.user.passwordResetToken} </p>
	<small> &copy; ${data.app_name} </small>
`