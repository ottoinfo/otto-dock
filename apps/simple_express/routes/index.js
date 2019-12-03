const express = require('express')
const routes = express.Router()
// const jsonParser = express.json()

const endpointMiddleware = require('../middleware/endpoint')
const authorizationRoutes = require('./authorization')
const userRoutes = require('./users')

routes.use(endpointMiddleware)

routes.get('/', function (req, res) {
  console.log({ csrfToken: req.csrfToken() })
  res.send('hello world')
})

routes.get('/hello/:name', function (req, res) {
  res.send('hello ' + req.params.name + '!')
})

routes.get('/error', function (req, res, next) {
  try {
    throw new Error('Error from Server')
  } catch (error) {
    return next(error)
  }
})

routes.get('/timeout', function (req, res, next) {
  // this is a route to show how if you don't
  // return a response
  // OR
  // call next()
  // server will just timeout
  const logger = req.app.get('logger')
  if (logger) {
    logger.info('this URL will timeout after a couple minutes')
  }
  // this is a good reason to have TRY CATCH logic
  // since we have errorHandler middleware it take cares of the ERRORs
  //
  // UNCOMMENT NEXT LINE TO TRY
  // const value = obj.this.does.not.exist
})

routes.use(authorizationRoutes)

routes.use('/api', userRoutes)

routes.get('/check/:userId', (req, res) => {
  // Check User Routes PARAM middleware /users/:userId
  // doesn't affect other routes
  return res.send('No Problem with UserId')
})

routes.get('*', async (req, res) => {
  res.status(404).send('Unknown Route')
})

module.exports = routes
