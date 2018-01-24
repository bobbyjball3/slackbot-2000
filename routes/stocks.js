'use strict'
const Express = require('express')
const request = require('request')

const router = Express.Router()

function stockRoutes(getStockPrice) {

  router.post('/', (req, res, next) => {
    // FIXME: probably should loop in case we support more than one symbol in the future
    let stockSymbol = req.stockSymbols[0]
    getStockPrice(stockSymbol)
      .then(tradingPrice => {
        let stockInformation = `${stockSymbol} is currently trading at ${tradingPrice}`
        res.status(200).send(stockInformation).end()
      })
      .catch(err => {
        return next(err)
      })
  })

  return router
}

module.exports = stockRoutes
