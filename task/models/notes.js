const mongoose = require('mongoose')

const notesSchema =mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("Notes",notesSchema)