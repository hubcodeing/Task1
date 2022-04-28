const Notes = require("../models/notes")



exports.user = async (req, res) => {
    const notes = await new Notes(req.body);
    notes.save(() => {
        

            try {
                res.json({ success: true, message: " data post  successfully", data: notes })
            } catch (err) {
                console.log(err)
            }
        
    })
}
exports.get = async (req, res) => {
    const notes = await Notes.findOne({})
    try {
        res.json({ success: true, message: "data get", data: notes })
    } catch (err) {
        console.log(err)
    }

}

exports.update = async (req, res) => {
    const notes = await Notes.findByIdAndUpdate({ _id: req.params.id }, req.body)
    notes.save(() => {
        try {
            res.json({ success: true, message: "data update successfully ", data: notes })
        } catch (err) {
            console.log(err)
        }
    })
}

exports.note = async(req, res) => {
    const notes = await Notes.findByIdAndDelete(req.params.id)
    try {
        res.json({ success: true, message: " data delete successfully" ,data:notes})
    } catch (err) {
        console.log(err)
    }
}