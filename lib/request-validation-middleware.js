'use strict'
const slackToken = process.env.SLACK_VALIDATION_TOKEN || 'test'

function validateRequest(req, res, next) {
  let requestToken = req.body.token
  
  if (requestToken !== slackToken) {
    let message = 'Unable to authorize request using token in request'
    let err = new Error(message)
    err.code = 'NOT_AUTHORIZED'
    return next(err)
  }

  return next()

}

module.exports = validateRequest