import mongoose from "mongoose";

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
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  profile_file: {
    type: String,
  },
  profile_url: {
    type: String,
  },
});
const Login = mongoose.model("Login", loginSchema);
export default Login;
