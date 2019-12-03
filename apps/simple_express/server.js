const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const csrf = require('csurf')

const routes = require('./routes')
const Logger = require('./middleware/logger')
const errorHandlerMiddleware = require('./middleware/errorHandler')

const server = express()
const { PORT, NODE_ENV } = process.env
const port = PORT || 3000
const dev = NODE_ENV !== 'production'

server.set('title', 'Otto-Node')
server.set('x-powered-by', !dev) // Turn off HTTP header => "X-Powered-By: Express" in Production
server.set('description', 'Node Express Example Application')
server.set('logger', Logger) // We could pass the LOGGER on as a option

// Additional Logging - HTTP REQUEST
server.use(
  require('morgan')(dev ? 'dev' : 'combined', {
    // dev -> :method :url :status :response-time ms - :res[content-length]
    // combined - Standard Apache combined log output -> :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
    stream: Logger.stream,
    skip (req, res) {
      // Don't Log the Following Items
      return res.statusCode < 400
    },
  }),
)

// Setup Middleware
if (!dev) {
  server.use(compression())
}
server.use(cookieParser())
server.use(csrf({ cookie: true }))
server.use((req, res, next) => {
  // res.cookie('XSRF-TOKEN', req.csrfToken())
  res.locals.csrftoken = req.csrfToken()
  next()
})

// Routes
server.use('/', routes)

// Error Handling Middleware
server.use(errorHandlerMiddleware)

// Start Server
server.listen(port, err => {
  if (err) throw err
  Logger.info(`> Ready on http://localhost:${port}`)
  Logger.info({ locals: server.locals })
})
