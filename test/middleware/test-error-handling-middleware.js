'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

// Arrange
const errHandler = require('../../middleware/error-handling-middleware')
const unauthorizedErr = new Error('Request is unauthorized')
unauthorizedErr.code = 'NOT_AUTHORIZED'
const genericErr = new Error('Generic error')

const stubbedReq = {
  log: {
    error: sinon.spy()
  }
}
const send = sinon.spy()
const stubbedRes = {
  status: sinon.stub().returns({ send: send })
}

describe('Error handling Middleware Tests', () => {
  it('Should respond with a 403 when the request is not authorized', (done) => {
    // Act
    errHandler(unauthorizedErr, stubbedReq, stubbedRes, (err) => {
      // Assert
      expect(err).to.be.undefined
      expect(stubbedRes.status.calledWith(403)).to.be.true
      expect(stubbedReq.log.error.calledWith(unauthorizedErr)).to.be.true
      stubbedRes.status.resetHistory()
      return done()
    })
  })

  it('Should only log the error if it is generic', (done) => {
    // Act
    errHandler(genericErr, stubbedReq, stubbedRes, (err) => {
      // Assert
      expect(err).to.be.undefined
      expect(stubbedRes.status.called).to.be.false
      expect(stubbedReq.log.error.calledWith(genericErr)).to.be.true
      stubbedRes.status.resetHistory()
      return done()
    })
  })
})
