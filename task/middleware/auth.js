const jwt = require("jsonwebtoken");
const Login = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    if (!token) throw new Error("token is not Authorization");
    const decoded = jwt.verify(token, "login");
    if (!decoded) throw new Error("id  is not decoded");
    const user = await Login.findOne({
      _id: decoded.id,
    });
    if (!user) throw new Error("user is not found ");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: error.message });
  }
};
module.exports = auth;
