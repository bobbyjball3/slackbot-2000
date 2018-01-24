'use strict'

// Import app, log instance, and listening port
const { log, app, port } = require('./app')

// Start the app on the imported port value
app.listen(port, (err) => {
  if (err) {
    log.error(err)
    process.exit(1)
  }

  log.info(`${app.get('appName')} server listening on port ${port}`)
})
