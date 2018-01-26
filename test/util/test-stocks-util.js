'use strict'

const expect = require('chai').expect
const nock = require('nock')
const getStockPrice = require('../../util/stocks-util')

describe('Stocks Util Tests', () => {
  it('Should throw an error when unable to retrieve stock information', (done) => {
    let scope = nock('https://finance.google.com')
      .get(/\/finance.*/)
      .reply(500, 'Something went wrong :(')

    getStockPrice('AMZN')
      .then((stockData) => {})
      .catch((err) => {
        expect(err).to.be.instanceof(Error)
        expect(err.message).to.equal('Unable to retrieve stock data for symbol AMZN')
        return done()
      })
  })

  it('Should return stock tradingPrice when it can retrieve it', (done) => {
    let scope = nock('https://finance.google.com')
      .get(/\/finance.*/)
      .reply(200, '// [{"l":1.11, "name": "Amazon Inc."}]')

    getStockPrice('AMZN')
      .then((stockData) => {
        expect(stockData).to.be.instanceOf(Object)
        expect(stockData.tradingPrice).to.match(/\d+\.\d+USD/)
        console.log(stockData.companyName)
        expect(stockData.companyName).to.have.length.above(0)
        return done()
      })
      .catch((err) => {
        console.log(err)
        return done(err)
      })
  })
})