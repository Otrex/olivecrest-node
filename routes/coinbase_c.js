
const route = require('express').Router()

// Middlewares
const WebHook = require('../http/Middleware/WebHook')
const CoinBaseC = require('../http/Controllers/CoinbaseController')

route.post("/webhook", WebHook.rawBody, CoinBaseC.webhook)
route.get("/charge", CoinBaseC.charge)
module.exports = route
