const express = require("express");
// const Sentry = require('@sentry/node')
const cookieParser = require("cookie-parser");
const nextJS = require("next");
const compression = require("compression");
const logger = require("./middleware/logger");

const dev = process.env.NODE_ENV !== "production";
const nextApp = nextJS({ dev });
const server = express();
nextApp
  .prepare()
  .then(() => {
    if (dev) {
      // Logging ( Don't Polute Production )
      server.use(
        require("morgan")(dev ? "tiny" : "combined", {
          stream: logger.stream,
          skip(req, res) {
            return req.path.search(/_next.*/) > -1;
          }
        })
      );
      server.use(compression());
    }
    server.use(cookieParser());

    // Redirect for Bad URLS - Unknown Routes
    server.use("*", (req, res, next) => {
      logger.info("unknown route");
      return res.send(
        `Unknown Route: <a href='${process.env.SITE_URL}'>Home Page</a>`
      );
    });
    // Server
    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000"); // eslint-disable-line
    });
  })
  .catch(e => {
    // Handle the error!
    console.error("Error Starting App\n----------");
    console.error(e);
    console.error("----------");
  });
