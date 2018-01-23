'use strict'

function validateRequest(slackValidationToken) {

  return function(req, res, next) {
    let requestToken = req.body.token

    if (requestToken !== slackValidationToken) {
      let message = 'Unable to authorize request using token in request'
      let err = new Error(message)
      err.code = 'NOT_AUTHORIZED'
      return next(err)
    }

    return next()

  }

}

module.exports = validateRequest