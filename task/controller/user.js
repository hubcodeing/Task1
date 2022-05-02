const Login = require("../models/user");
const jwt = require("jsonwebtoken");
var secret = "login";
const { userRegistrationSchema } = require("../models/joi");
exports.login = async (req, res) => {
  try {
    const data = await userRegistrationSchema.validateAsync(req.body);
    console.log(data);
    let user = await new Login(req.body);
    await user.save();
    res.json({ success: true, message: "register successfully", data: user });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
exports.register = async (req, res) => {
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
    console.log(err);
    res.json({ success: false, message: "login  unsuccessfull" });
  }
};
