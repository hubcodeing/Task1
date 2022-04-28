const express = require("express");
const res = require("express/lib/response");
const app = express();
const Login = require("../models/user")
const router = express.Router();
secret = "task"
var jwt =require('jsonwebtoken')

router.post("/register", async (req, res) => {
    console.log("hello",user)
    let user = await new Login();
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    user.phone = req.body.phone
    user.save((err) => {
        if (err) {
            console.log("errr")
        } else {
            console.log("success")
        }
    })
    res.send(user)
});

router.post("/login", function (req, res) {
    Login.findOne({ email: req.body.email }).exec(function (err, user) {
        if (err) throw err
        else {
            if (!user) {
                res.json({ success: false })
            }
            var token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '1h' });
            res.json({ success: true ,token:token})
        }
    })
})

module.exports = router;
