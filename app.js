'use strict'
const Bunyan = require('bunyan')
const Express = require('express')
const config = require('config')
const packageInfo = require('./package.json')
const getStockPrice = require('./util/stocks-util')
// Middleware
const expressLogger = require('express-bunyan-logger')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const validateRequest = require('./middleware/request-validation-middleware')
const validateStockSymbols = require('./middleware/stocks/stock-symbol-validation-middleware')
const errorHandler = require('./middleware/error-handling-middleware')

// Routes
const stocks = require('./routes/stocks')
const brubble = require('./routes/brubble')

const stocksSlackValidationToken = process.env.STOCKS_SLACK_VALIDATION_TOKEN || 'test'
const brubbleSlackValidationToken = process.env.BRUBBLE_SLACK_VALIDATION_TOKEN || 'test'
const port = process.env.PORT || config.server.port
const log = new Bunyan({
  name: packageInfo.name,
  level: config.logging.level
})

const app = Express()
app.set('appName', packageInfo.name)
// Request logging
app.use(expressLogger({
  logger: log,
  level: config.logging.level
}))
// Slew of security optimizations
app.use(helmet({
  hsts: config.security.hsts
}))
// Parser url-encoded form data
app.use(bodyParser.urlencoded({
  extended: true
}))

// Mount all routes
app.use('/stocks', validateRequest(stocksSlackValidationToken), validateStockSymbols, stocks(getStockPrice))
app.use('/brubble', validateRequest(brubbleSlackValidationToken), brubble)

// Global error handler
app.use(errorHandler)

module.exports = {
  log: log,
  app: app,
  port: port
}
