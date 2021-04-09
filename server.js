// Env File SetUp
require("dotenv").config({path : "./.env"})

// Connect App to DB
require("./database").connect()

// App SetUp
const app = require('./app')

// Port SetUp
PORT = process.env.PORT || 3000

// Serve App
app.listen(PORT, ()=>{
	console.log("=====================================================")
	console.log(`${process.env.APP_MODE.toUpperCase()} SERVER STARTED :: PORT:${PORT}`)
	console.log("=====================================================")
})