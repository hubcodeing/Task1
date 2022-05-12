import express from "express";
import api from "./task/routes/api";
import notes from "./task/routes/notes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { infoLogger, errorLogger } from "./logger";
require("dotenv").config();
const app = express();
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
