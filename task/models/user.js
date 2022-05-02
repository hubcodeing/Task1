const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: Number,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
});
const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
