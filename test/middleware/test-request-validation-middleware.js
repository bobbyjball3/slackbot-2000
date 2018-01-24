'use strict'

const expect = require('chai').expect
const validateRequest = require('../../middleware/request-validation-middleware')
const testValidationToken = 'test'

describe('Request Validation Middleware Tests', () => {
  it('Should validate request if token is present and valid', (done) => {
    // Arrange
    let configuredValidateRequest = validateRequest(testValidationToken)
    let req = { body: { token: testValidationToken } }

    // Act
    configuredValidateRequest(req, {}, (err) => {
      // Assert
      expect(err).to.be.undefined
      return done()
    })
  })

  it('Should call callback with error if token is invalid', (done) => {
    // Arrange
    let configuredValidateRequest = validateRequest(testValidationToken)
    let req = { body: { token: 'garbage' } }

    // Act
    configuredValidateRequest(req, {}, (err) => {
      // Assert
      expect(err).to.not.be.undefined
      expect(err.code).to.equal('NOT_AUTHORIZED')
      return done()
    })
  })

  it('Should call callback with error if token is missing', (done) => {
    // Arrange
    let configuredValidateRequest = validateRequest(testValidationToken)
    let req = { body: { } }

    // Act
    configuredValidateRequest(req, {}, (err) => {
      // Assert
      expect(err).to.not.be.undefined
      expect(err.code).to.equal('NOT_AUTHORIZED')
      return done()
    })
  })
})
