'use strict'
const Express = require('express')
const request = require('request')

// Middleware
const validateStockSymbols = require('../lib/stock-symbol-validation-middleware')

const router = Express.Router()

router.post('/', validateStockSymbols, (req, res, next) => {
  let url = `https://finance.google.com/finance?q=NASDAQ:${req.stockSymbols[0]}&output=json`
  request.get(url, (err, quoteRes, body) => {
    if (err) {
      req.log.error(err)
      return next(err)
    }

    let stockData = JSON.parse(body.substring(3))[0]
    let response = `${stockData.symbol} is currently trading at ${stockData.l}USD`
    res.status(200).send(response).end()
  })
})

module.exports = router