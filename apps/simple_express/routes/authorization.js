const express = require('express')
const authorizationRoutes = express.Router()
const jsonParser = express.json()

authorizationRoutes.get('/login', (req, res, next) => {
  return res.send(`
    <html>
      <head>
        <meta name="csrf-token" content="${req.csrfToken()}">
      </head>
      <body>
        <form action="/login" method="post">
          <input type="hidden" name="_csrf" value="${req.csrfToken()}">
          <div>
              <label>Username:</label>
              <input type="text" name="username"/>
          </div>
          <div>
              <label>Password:</label>
              <input type="password" name="password"/>
          </div>
          <div>
              <input type="submit" value="Log In"/>
          </div>
        </form>
      </body>
    </html>
  `)
})

authorizationRoutes.post('/login', jsonParser, (req, res) => {
  console.log({ head: req.headers })
  res.send('csrf was required to get here')
})

module.exports = authorizationRoutes
