const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = express.Router();
const {login,register}=require("../controller/user");
router.post("/register",login)
 
router.post("/login",register)

module.exports = router;
