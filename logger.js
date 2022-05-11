const winston = require("winston");
require("dotenv").config();
const info = new Date().toDateString() + "-" + "info";
const error = new Date().toDateString() + "-" + "error";
console.log(info);
const folderName = process.env.FOLDER;

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
