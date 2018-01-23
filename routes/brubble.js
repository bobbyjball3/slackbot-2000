'use strict'
const Express = require('express')
const request = require('request')

// Middleware

const router = Express.Router()

router.post('/', (req, res, next) => {
  let repsonses = req.body.text
  res.status(200).send(repsonses).end()
})

module.exports = router