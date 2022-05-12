import jwt from "jsonwebtoken";
import Login from "../models/user";
require("dotenv").config();
const secret = process.env.SECRET;
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    if (!token) throw new Error("token is not Authorization");
    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new Error("id  is not decoded");
    const user = await Login.findOne({
      _id: decoded.id,
    });
    if (!user) throw new Error("user is not found ");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};
export default auth;
