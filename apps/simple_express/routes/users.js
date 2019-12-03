const express = require('express')
const userRoutes = express.Router()
const jsonParser = express.json()

const users = require('../data/users')
const { successPayload } = require('../lib/Apis')
const { ApiError, MissingParamsError } = require('../lib/Errors')

// VALIDATE USERID
userRoutes.param('userId', (req, res, next, userId) => {
  try {
    const { endpoint } = req
    if (!userId) {
      throw new MissingParamsError({
        endpoint,
        message: 'Missing API param: userId',
      })
    }
    if (isNaN(Number(userId))) {
      throw new MissingParamsError({
        endpoint,
        message: 'API param userId must be a INTEGER',
      })
    }
    next()
  } catch (error) {
    next(error)
  }
})

userRoutes.get('/users', (req, res, next) => {
  try {
    return res.json({ ...successPayload, payload: users })
  } catch (error) {
    return next(error)
  }
})

userRoutes.get('/users/:userId', (req, res, next) => {
  try {
    const { userId } = req.params
    const user = users.find(item => item.id === userId)
    if (!user) {
      const { endpoint } = req
      throw new ApiError({ endpoint, message: 'No User Found' })
    }
    return res.json({ ...successPayload, payload: user })
  } catch (error) {
    return next(error)
  }
})

userRoutes.post('/users/:userId', jsonParser, (req, res, next) => {
  try {
    const { userId } = req.params
    const user = users.find(item => item.id === userId)
    return res.json({ user })
  } catch (error) {
    return next(error)
  }
})

module.exports = userRoutes
