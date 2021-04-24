// Imports
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const express = require("express")
const path = require("path")
var expressLayouts = require('express-ejs-layouts');
var coinbase = require('coinbase-commerce-node');

var Client = coinbase.Client;
// Init App
const app = express()

Client.init(process.env.COINBASE_C_API_KEY);
// Error Handler
const { errorHandler } = require("./services/core/Exception")

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


app.use(cookieParser(process.env.APP_COOKIE_SECRET))


// Allow Json Parser
app.use(express.urlencoded({extended: false}));

app.use(express.json())

app.use(xss());

app.use(hpp());

// Static SetUp
app.use(express.static(path.join(__dirname, 'static')))

// EJS Veiws setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(expressLayouts);

//  apply to all requests
app.use(limiter);

// Headers SetUp
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, Origin, Content-Type, Accept'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Dev Info
if (process.env.APP_MODE == 'DEVELOPMENT'){
	app.use((req, res, next) => {
		console.log(`::VISITING: ${req.url}`)
        console.log(`::QUERY: ${JSON.stringify(req.body /*|| req.query*/)}`)
        console.log(`---------------------------------------------`)
		next()
	})
}

// General MiddleWares
const Verify = require('./http/Middleware/Verify')
const Restrict = require('./http/Middleware/Restrict')

// Routes
// app.use('/test', require('./routes/test'))
app.use('/', require('./routes/home'))
app.use('/auth', require('./routes/auth'))
app.use('/dash', require('./routes/dashboard'))
app.use('/paystack', require('./routes/paystack'))
app.use('/cc', require('./routes/coinbase_c'))
app.use('/admin', Verify.authenticated, Restrict.to({ admin: true }), require('./routes/admin'))

// Error Handler route
app.use(errorHandler)

module.exports = app