const Notes = require("../models/notes");

exports.user = async (req, res) => {
  try {
    const notes = await new Notes(req.body);
    const data = await notes.save();
    res.json({ success: true, message: " data post  successfully", data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
exports.get = async function (req, res) {
  try {
    const notes = await Notes.find({});
    res.json({ success: true, message: "data get", data: notes });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

exports.update = async function (req, res) {
  try {
    const notes = await Notes.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    const data = await notes.save();
    res.json({ success: true, message: "data update successfully ", data });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.note = async function (req, res) {
  try {
    const notes = await Notes.findByIdAndDelete({ _id: req.params.id });

    res.json({
      success: true,
      message: " data delete successfully",
      data: notes,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
