const { createLogger, format, transports } = require("winston");

const { combine, prettyPrint } = format;

const { APP_ENV, NODE_ENV } = process.env;
const dev = NODE_ENV !== "production";
const level = APP_ENV === "development" ? "silly" : "debug"; // TODO Warning

// WINSTON Configurations
// level - Level of messages to log.
// filename - The file to be used to write log data to.
// handleExceptions - Catch and log unhandled exceptions.
// json - Records log data in JSON format.
// maxsize - Max size of log file, in bytes, before a new file will be created.
// maxFiles - Limit the number of files created when the size of the logfile is exceeded.
// colorize - Colorize the output. This can be helpful when looking at console logs.
// Logging levels indicate message priority and are denoted by an integer. Winston uses npm logging levels that are prioritized from 0 to 5 (highest to lowest):
// --
// 0: error
// 1: warn
// 2: info
// 3: verbose
// 4: debug
// 5: silly

const options = {
  console: {
    level,
    handleExceptions: true,
    json: true,
    colorize: true,
    prettyPrint: false
  },
  elasticsearch: {
    level
  }
};

const logger = createLogger({
  defaultMeta: {
    app_env: APP_ENV,
    node_env: NODE_ENV,
    service: "ottoinfo admin ( NODE-JS )",
    timestamp: new Date().toLocaleString()
  },
  exitOnError: false, // do not exit on handled exceptions
  level,
  format: format.json(),
  transports: [new transports.Console()]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

module.exports = logger;

// LOG LEVELS ( 6 LEVELS ) -> Winston has specific names for “warning” => (“verbose”) and “trace” => (“silly”).
// FATAL – THE APPLICATION IS IN A CRITICAL STATE AND CANNOT PROCEED WITH THE EXECUTION OF THE CURRENT OPERATION. IN THIS CASE, THE APPLICATION USUALLY REPORTS SUCH MESSAGE AND TERMINATES.
// ERROR – A SERIOUS PROBLEM OCCURRED WHILE PROCESSING THE CURRENT OPERATION. SUCH A MESSAGE USUALLY REQUIRES THE USER TO INTERACT WITH THE APPLICATION OR RESEARCH THE PROBLEM IN ORDER TO FIND THE REASON AND RESOLVE IT.
// (TIP: EXCEPTIONS ARE USUALLY REPORTED AS ERRORS BECAUSE THEY USUALLY HAVE A SIMILAR MEANING.)
// WARNING – SUCH MESSAGES ARE REPORTED WHEN SOMETHING UNUSUAL HAPPENED THAT IS NOT CRITICAL TO PROCESS THE CURRENT OPERATION (AND THE APPLICATION IN GENERAL), BUT IT WOULD BE USEFUL TO REVIEW THIS SITUATION TO DECIDE IF IT SHOULD BE RESOLVED. (TIP: THIS LEVEL IS USUALLY SELECTED AS ACTIVE FOR APPLICATIONS IN PRODUCTION.)
// INFO – INFORMATIVE MESSAGES ARE USUALLY USED FOR REPORTING SIGNIFICANT APPLICATION PROGRESS AND STAGES. INFORMATIVE MESSAGES SHOULD NOT BE REPORTED TOO FREQUENTLY BECAUSE THEY CAN QUICKLY BECOME “NOISE.”
// DEBUG – USED FOR DEBUGGING MESSAGES WITH EXTENDED INFORMATION ABOUT APPLICATION PROCESSING. SUCH MESSAGES USUALLY REPORT CALLS OF IMPORTANT FUNCTIONS ALONG WITH RESULTS THEY RETURN AND VALUES OF SPECIFIC VARIABLES, OR PARAMETERS.
// TRACE – THIS LEVEL IS MOST INFORMATIVE (AND USUALLY EVEN EXCESSIVE). TRACE MESSAGES REPORT MOST OF APPLICATION ACTIONS OR EVENTS AND ARE MOSTLY USED TO FOLLOW APPLICATION LOGIC IN FULL DETAIL.
