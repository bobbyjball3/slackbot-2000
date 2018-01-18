'use strict'

const config = {
  logging: {
    level: 'debug'
  },
  security: {
    hsts: false
  },
  server: {
    port: 8080,
    pathBase: 'slack'
  }
}

module.exports = config