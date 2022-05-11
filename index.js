const express = require("express");
const app = express();
const api = require("./task/routes/api");
const notes = require("./task/routes/notes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { infoLogger, errorLogger } = require("./logger");
require("dotenv").config();
const port = process.env.PORT;
const host = process.env.HOST;
const db = `${host}`;
mongoose
  .connect(db)
  .then(() => {
    console.log("connected success");
  })
  .catch((err) => {
    console.log("not success");
  });

app.use("/upload", express.static("file"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", api);
app.use("/note", notes);
app.listen(port, () => infoLogger.info("succsessfull", port, host));
