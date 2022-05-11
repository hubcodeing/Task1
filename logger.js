const winston = require("winston");
module.exports = {
  infoLogger: winston.createLogger({
    transports: new winston.transports.File({
      level: "info",
      filename: "2022-05-09-info.log",
      json: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  }),
  errorLogger: winston.createLogger({
    transports: new winston.transports.File({
      level: "error",
      filename: "2022-05-09-error.log",
      json: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  }),
};
