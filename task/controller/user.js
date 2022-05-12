const Login = require("../models/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const { infoLogger, errorLogger } = require("../../logger");
const { user } = require("./notes");
const { insertMany, remove } = require("../models/user");
require("dotenv").config();
const secret = process.env.SECRET;
const HOST = process.env.HOST;
const upload = require("../middleware/upload");

const employee = require("../models/employee");
let __basedir = path.resolve();
var generator = require("generate-password");
const nodemailer = require("nodemailer");
exports.register = async (req, res) => {
  try {
    var password = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log(password);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // console.log("transporter", transporter);
    let mailOptions = {
      from: process.env.USER,
      to: req.body.email,
      subject: "password verification",
      text: "use this password for signup" + password,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error send me", error);
      }
      console.log("info me", info);
      res.render("contact", { message: "Email has been sent" });
    });

    let user = await Login.create({ ...req.body, password });
    infoLogger.info(user);
    res
      .status(200)
      .json({ success: true, message: "register successfully", data: user });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.csvfileUpload = async (req, res) => {
  try {
    let Tutorial = [];
    let path = __basedir + "/file/" + req.file.filename;
    // console.log("path", path);
    fs.createReadStream(path)
      .pipe(csv())
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        Tutorial.push(row);
      })
      .on("end", () => {
        // console.log("todos", Tutorial);
        employee.insertMany(Tutorial);
        fs.unlinkSync(path);
      });
    infoLogger.info(req.file);
    res.status(200).json({
      success: true,
      message: "csv file uplaod successfully",
      data: user,
    });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.body.email });
    if (!user) {
      errorLogger.error(err.message);
      return res
        .status(200)
        .json({ success: false, message: "user is already login" });
    } else
      var token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "1h",
      });
    infoLogger.info(user);
    res.status(200).json({ success: true, token: token });
  } catch (err) {
    res.status(400).json({ success: false, message: "login  unsuccessfull" });
  }
};

exports.getid = async function (req, res) {
  try {
    const notes = await Login.findById(req.params.id);
    if (!notes) throw new Error("data not find ");
    else infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err);
    res.status(400).json({ success: false, message: err.message });
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
    res
      .status(200)
      .json({ success: true, message: "data update successfully ", notes });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
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

    res.status(400).json({ success: false, message: err.message });
  }
};

exports.profileurlpath = async (req, res) => {
  upload(req, res, async function (err) {
    try {
      // let user = new Login();
      // console.log(user);
      // user.name = req.body.name;
      // user.email = req.body.email;
      // user.password = req.body.password;
      // user.phone = req.body.phone;
      // user.profile_file = req.file.filename;
      // user.profile_url = req.file.filename;
      // user.save();
      const body = { ...req.body, profile_url: req.file.filename };
      const user = await Login.create(body);

      console.log(user);
      res.status(200).json({
        success: true,
        message: "photo upload successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: "Please select photo" });
    }
  });
};
