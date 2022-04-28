const Login = require("../models/user");
const jwt = require("jsonwebtoken");
var secret = "login";
exports.login = async (req, res) => {
  try {
    let user = new Login();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;
    await user.save();
    res.json({ success: true, message: "register successfully", data: user });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "register successfully" });

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
  }
};
