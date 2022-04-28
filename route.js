const express = require("express");
const res = require("express/lib/response");
const app = express();
const Login = require("./model")
const router = express.Router();

router.get("/",function(req,res){
    Login.find({}).exec(function(err,user){
        console.log(user)
        if(err) throw err
        else{
            if(!user){
                res.json({success:false , message:"data not find"})
                
        }else{
            res.json({success:true , message:" data get success" ,data:user})
        }

        }
    })
})

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

router.post("/login", function (req, res) {
    Login.findOne({ email: req.body.email }).exec(function (err, user) {
        if (err) throw err
        else {
            if (!user) {
                res.json({ success: false })
            }
            res.json({ success: true })
        }
    })
})
router.put("/:id",async(req,res)=>{
    Login.findByIdAndUpdate({_id:req.params.id},req.body).exec(function(err,user){
        if(err) throw err
        else{
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
            res.send(user)        }
    })
})
module.exports = router;
