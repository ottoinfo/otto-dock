const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3001;

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
const Endpoints = require("./endpoints");
const Helpers = require("./helpers");

Helpers.db.sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .error(err => console.error({ err }));

const server = express();
server.use(cookieParser());
server.use(
  require("morgan")(dev ? "tiny" : "combined", {
    stream: logger.stream,
    skip(req, res) {
      return req.path.search(/_next.*/) > -1;
    }
  })
);

server.use(Endpoints.petRoutes());

server.get("*", (req, res) =>
  res.json({
    success: false,
    payload: {},
    message: "Unknown API"
  })
);
// Server
server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
});
