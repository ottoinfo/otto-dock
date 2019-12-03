const { errorPayload } = require('../lib/Apis')
const { ERRORS } = require('../lib/Errors')
const Logger = require('./logger')

const errorHandlerMiddleware = (error, req, res, next) => {
  Logger.info('Error Handler Middleware', { error })
  const { name, message, data } = error
  const { log, slack } = data || {}
  if (log) {
    Logger.error(message, { error })
  }
  if (slack) {
    // if we want to connect to a slack channel
  }

  if (error.code === 'EBADCSRFTOKEN') {
    // handle CSRF token errors here
    return res.status(403).send('form tampered with')
  }

  switch (name) {
    case ERRORS.API:
    case ERRORS.PARAMS:
      return res.status(404).json(errorPayload)
    default:
      return res.status(500).send('Server Error')
  }
}

module.exports = errorHandlerMiddleware
