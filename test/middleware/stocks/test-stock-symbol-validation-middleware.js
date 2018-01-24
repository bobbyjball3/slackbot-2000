'ues strict'

const expect = require('chai').expect
const sinon = require('sinon')

const validateStockSymbols = require('../../../middleware/stocks/stock-symbol-validation-middleware')

describe('Stock Symbol Validation Middleware Tests', () => {
  it('Should return only the first valid symbol if multiple symbols are provided', (done) => {
    // Arrange
    let stubbedReq = {
      body: {
        text: 'amzn AAPL'
      },
      log: {
        info: sinon.spy(),
        debug: sinon.spy()
      }
    }

    // Act
    validateStockSymbols(stubbedReq, {}, (err, req, res) => {
      // Assert
      expect(err).to.be.undefined
      expect(stubbedReq.log.info.called).to.be.true
      expect(stubbedReq.log.info.calledWith(`Quote request for symbols: ${stubbedReq.body.text.split(' ')}`)).to.be.true
      expect(stubbedReq.stockSymbols.length).to.equal(1)
      expect(stubbedReq.stockSymbols).to.deep.equal([ 'AMZN' ])
      return done()
    })
  })

  it('Should call the callback with an error if no valid symbols were provided', (done) => {
    // Arrange
    let stubbedReq = {
      body: {
        text: 'ASDASDASDASDASDASD ASDASDASDASDASDASDASD'
      },
      log: {
        info: sinon.spy(),
        debug: sinon.spy()
      }
    }

    // Act
    validateStockSymbols(stubbedReq, {}, (err, req, res) => {
      // Assert
      expect(err).to.be.instanceof(Error)
      expect(stubbedReq.log.info.calledWith(`Quote request for symbols: ${stubbedReq.body.text.split(' ')}`)).to.be.true
      expect(err.message).to.contain('All stock symbols provided were invalid:')
      return done()
    })
  })
})
