const express = require("express")
const app = express();
const api = require("./route")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
// const router = express.Router();
const db ="mongodb://localhost:27017/login"
mongoose.connect(db).then(()=>{
console.log("connected success")
}).catch((err)=>{
    console.log("not success")
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use("/",api)
app.listen(8000,()=>console.log("succsessfull",8000));
