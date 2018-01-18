'use strict'

function validateStockSymbols(req, res, next) {
  try {
    let rawStockSymbols = req.body.text.split(' ')
    req.log.info(`Quote request for symbols: ${rawStockSymbols}`)

    // Only allow 1 stock symbols per request
    if (rawStockSymbols.length > 1) {
      rawStockSymbols = rawStockSymbols.slice(0,1)

    }

    rawStockSymbols = rawStockSymbols.map(symbol => {
      return symbol.toUpperCase()
    })

    let validatedStockSymbols = rawStockSymbols.filter(symbol => {
      // between 1 and 5 characters per ISRA requirements: https://www.theocc.com/components/docs/clearing/services/nms_plan.pdf
      if (symbol.length > 0 && symbol.length <= 5) {
        return true
      }

      return false
    })

    req.log.debug(`validated stock symbols: ${validatedStockSymbols}`)

    // If there are no symbols to operate on, return an error
    if (validatedStockSymbols.length === 0) {
      let message = `All stock symbols provided were invalid: ${req.body.text}`
      let err = new Error(message)
      return next(err)
    }

    req.stockSymbols = validatedStockSymbols
    return next()

  } catch (err) {
    next(err)
  }
}

module.exports = validateStockSymbols