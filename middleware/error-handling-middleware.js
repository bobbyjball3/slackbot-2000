'use strict'

function errorHandler (err, req, res, next) {
  if (err.code && err.code === 'NOT_AUTHORIZED') {
    res.status(403).send('Unauthorized request or invalid request token')
  }

  req.log.error(err)
  return next()
}

module.exports = errorHandler
