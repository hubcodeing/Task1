const Login = require("../models/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const { infoLogger, errorLogger } = require("../../logger");
const { user } = require("./notes");
const { insertMany } = require("../models/user");
require("dotenv").config();
const secret = process.env.SECRET;
const employee = require("../models/employee");
let __basedir = path.resolve();

exports.register = async (req, res) => {
  try {
    let user = await Login.create(req.body, req.files);
    infoLogger.info(user);
    res.json({ success: true, message: "register successfully", data: user });
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
exports.name = async (req, res) => {
  try {
    let Tutorial = [];
    let path = __basedir + "/file/" + req.file.filename;
    console.log("path", path);
    const user = fs
      .createReadStream(path)
      .pipe(csv())
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        Tutorial.push(row);
      })
      .on("end", () => {
        console.log("todos", Tutorial);
        employee.insertMany(Tutorial);
      });
    let data = new Login();
    data.password = req.body.password;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.name = req.body.name;
    data.profile_file = req.file.filename;
    data.profile_url = "http://localhost:8000/upload/" + req.file.filename;
    console.log(req.file.filename);
    data.save();
    console.log(user);
    infoLogger.info(data);
    res.json({ success: true, message: "register successfully", data: data });
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.body.email });
    if (!user) {
      errorLogger.error(err.message);
      return res.json({ success: false, message: "user is already login" });
    } else
      var token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "1h",
      });
    infoLogger.info(user);
    res.json({ success: true, token: token });
  } catch (err) {
    res.json({ success: false, message: "login  unsuccessfull" });
  }
};

exports.getid = async function (req, res) {
  try {
    const notes = await Login.findById(req.params.id);
    if (!notes) throw new Error("data not find ");
    else infoLogger.info(notes);
    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err);
    res.json({ success: false, message: err.message });
  }
};
exports.update = async function (req, res) {
  try {
    const notes = await Login.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log(notes);
    infoLogger.info(notes);
    res.json({ success: true, message: "data update successfully ", notes });
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
exports.pop = async function (req, res) {
  try {
    console.log(req.params.id);
    const user = await Login.findByIdAndDelete({ _id: req.params.id });
    if (!user) throw new Error("user is not valid");
    infoLogger.info(user);
    res.status(200).json({ success: true, message: "delete data", user });
  } catch (err) {
    errorLogger.error(err.message);
    console.log("HELLO", err);

    res.json({ success: false, message: err.message });
  }
};
