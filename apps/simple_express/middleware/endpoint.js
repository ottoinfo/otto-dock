// req.endpoint => 'GET:/some/endpoint' || 'POST:/add/something?id=2'
const endpointMiddleware = (req, res, next) => {
  const { method, url } = req
  req.endpoint = `${method}:${url}`
  next()
}

module.exports = endpointMiddleware
