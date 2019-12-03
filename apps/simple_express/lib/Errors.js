const isDev = process.env.NODE_ENV === 'development'

// Constants for ERRORS constructor names
const ERRORS = {
  API: 'ApiError',
  PARAMS: 'MissingParamsError',
}

const MESSAGES = {
  API: 'API Error',
  PARAMS: 'Invalid or Missing Params',
}

// https://nodejs.org/api/errors.html
class CustomError extends Error {
  constructor (message) {
    // data:Object = { message, data, ...etc}
    super(message)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    // We ONLY want logging turned on ALWAYS for DEVELOP, otherwise override for ENV/ERRORS when needed
    this.data = { log: !!isDev, slack: false }
    Error.captureStackTrace(this, this.constructor)
  }
}

class ApiError extends CustomError {
  constructor (data) {
    const { endpoint, message } = data
    super(`${message || MESSAGES.API}: ${endpoint || 'Unknown Endpoint'}`)
    this.data = { ...this.data, ...data }
    console.log('ApiError', this.data)
  }
}

class MissingParamsError extends CustomError {
  constructor (data) {
    const { endpoint, message } = data
    super(`${message || MESSAGES.PARAMS}: ${endpoint || 'Unknown Endpoint'}`)
    this.data = { ...this.data, ...data }
  }
}

module.exports = {
  ApiError,
  CustomError,
  ERRORS,
  MESSAGES,
  MissingParamsError,
}
