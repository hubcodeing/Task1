const express = require("express");
const res = require("express/lib/response");
const app = express();
const Login = require("./model")
const router = express.Router();

router.post("/register", async (req, res) => {
    console.log("hello")
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

router.post("/login",function(req,res){
 Login.findOne({email:req.body.email}).exec(function(err,user){
        if(err) throw err
        else{
            if(!user){
                res.json({success: false})

            }
            res.json({success: true})
        }
    })
})

module.exports = router;
