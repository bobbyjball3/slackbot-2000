'use strict'
const Express = require('express')
const request = require('request')

const router = Express.Router()

router.post('/', (req, res, next) => {
  request.get('https://finance.google.com/finance?q=NASDAQ:AAPL&output=json', (err, quoteRes, body) => {
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