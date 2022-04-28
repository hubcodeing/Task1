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
exports.get = async function (req, res) {
    const notes = await Notes.findOne({})
    try {
        res.json({ success: true, message: "data get", data: notes })
    } catch (err) {
        console.log(err)
    }

}

exports.update = async function (req, res) {
    try {

        const notes = await Notes.findByIdAndUpdate({ _id: req.params.id }, req.body)
        const data = await notes.save();
        res.json({ success: true, message: "data update successfully ", data })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

exports.note = async function (req, res) {
    const notes = await Notes.findByIdAndDelete({ _id: req.params.id })

    try {
        res.json({ success: true, message: " data delete successfully", data: notes })
    } catch (err) {
        console.log(err)
    }
}