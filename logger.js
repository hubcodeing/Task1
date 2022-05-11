const winston = require("winston");
require("dotenv").config();
const folderName = process.env.FOLDER;
const info =
  new Date().toISOString().toString().replace(":", "-") + "-" + "info";
const error =
  new Date().toISOString().toString().replace(":", "-") + "-" + "error";

module.exports = {
  infoLogger: winston.createLogger({
    transports: new winston.transports.File({
      level: "info",
      filename: `${folderName}/${info}`,
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
      filename: `${folderName}/${error}`,
      json: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  }),
};
