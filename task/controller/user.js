const Login = require("../models/user");
const jwt = require("jsonwebtoken");
var secret = "login";
exports.register = async (req, res) => {
  try {
    let user = await Login.create(req.body);

    res.json({ success: true, message: "register successfully", data: user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: false, message: "user is already login" });
    } else
      var token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "1h",
      });
    res.json({ success: true, token: token });
  } catch (err) {
    res.json({ success: false, message: "login  unsuccessfull" });
  }
};

exports.getid = async function (req, res) {
  try {
    const notes = await Login.findById(req.params.id);
    if (!notes) throw new Error("data not find ");
    else res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
exports.update = async function (req, res) {
  try {
    const notes = await Login.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: "data update successfully ", notes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
exports.pop = async function (req, res) {
  try {
    const user = await Login.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("user is not valid");
    res.json({ success: true, message: "delete data", user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
