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

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
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
    const data = await Notes.findById(req.params.id);
    if (!data) throw new Error("id is not valid");
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

exports.match = async function (req, res) {
  try {
    const notes = await Notes.aggregate([{ $match: { title: "IPL" } }]);
    console.log(notes);
    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
};
exports.project = async function (req, res) {
  try {
    const notes = await Notes.aggregate([
      { $project: { _id: 0, discription: 1 } },
    ]);
    console.log(notes);

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
};

exports.addfilds = async function (req, res) {
  try {
    const notes = await Notes.aggregate([{ $addFields: { age: 50 } }]);
    console.log(notes);

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
};
exports.size = async function (req, res) {
  try {
    const notes = await Notes.aggregate([
      {
        $project: {
          age: 1,
          numberOfAge: {
            $cond: {
              if: { $isArray: "$age" },
              then: { $size: "$age" },
              else: "NA",
            },
          },
        },
      },
    ]);
    console.log(notes);

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
};

exports.look = async function (req, res) {
  try {
    const notes = await Notes.aggregate([
      {
        $lookup: {
          from: "logins",
          localField: "userId",
          foreignField: "_id",
          as: "new_docs",
        },
      },
    ]);
    console.log(notes);

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
    console.log(err);
  }
};
