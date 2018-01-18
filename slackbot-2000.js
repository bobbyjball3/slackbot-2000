'use strict'
const Bunyan = require('bunyan')
const Express = require('express')
const config = require('config')
const packageInfo = require('./package.json')

// Middleware
const expressLogger = require('express-bunyan-logger')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const validateRequest = require('./lib/request-validation-middleware')
const errorHandler = require('./lib/error-handling-middleware')

// Routes
const stocks = require('./routes/stocks')

const port = process.env.PORT || config.server.port
const log = new Bunyan({
  name: packageInfo.name,
  level: config.logging.level
})

const app = Express()
// Request logging
app.use(expressLogger({ 
  logger: log,
  level: config.logging.level 
}))
// Slew of security optimizations
app.use(helmet(
  {
    hsts: config.security.hsts
  }
))
// Parser url-encoded form data
app.use(bodyParser.urlencoded({ extended: true }))
// Verify request tokens are valid
app.use(validateRequest)

// Mount stocks router
app.use('/stocks', stocks)

app.use(errorHandler)

app.listen(port, (err) => {
  if (err) {
    log.error(err)
    process.exit(1)
  }

  log.info(`Server listening on port ${port}`)
})
