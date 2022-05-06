const { default: mongoose } = require("mongoose");
const Notes = require("../models/notes");
const Login = require("../models/user");
const { login } = require("./user");
exports.user = async (req, res) => {
  try {
    const notes = await Notes({ ...req.body, userId: req.user._id });
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
  }
};
exports.getid = async function (req, res) {
  try {
    const notes = await Notes.findById(req.params.id);
    if (!notes) throw new Error("data not find ");
    else res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.update = async function (req, res) {
  try {
    const id = await Notes.findById(req.params.id);
    if (!id) throw new Error("id is not find");
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
    const notes = await Notes.findByIdAndDelete(req.params.id);
    console.log(notes);
    if (!notes) throw new Error("id is not found");
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
    const notes = await Notes.aggregate([
      { $match: { title: req.body.title } },
    ]);
    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
exports.project = async function (req, res) {
  try {
    const notes = await Notes.aggregate([
      { $project: { _id: 0, discription: 1 } },
    ]);

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.addfilds = async function (req, res) {
  try {
    const notes = await Notes.aggregate([{ $addFields: { age: 50 } }]);
    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
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

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
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
      {
        $project: {
          userId: 1,
          numberOfuserId: {
            $cond: {
              if: { $isArray: "$_id" },
              then: { $size: "$_id" },
              else: "NA",
            },
          },
        },
      },
    ]);

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
exports.lookup = async function (req, res) {
  try {
    const notes = await Login.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.id),
        },
      },

      {
        $lookup: {
          from: "notes",
          localField: "_id",
          foreignField: "userId",
          as: "NotesData",
        },
      },
      { $addFields: { Total: { $size: { $ifNull: ["$NotesData", []] } } } },
    ]);

    res.json({ success: true, message: "data get", notes });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
exports.combine = async function (req, res) {
  try {
    const id = req.body.id;
    if (!id) {
      const data = await Notes.create({ ...req.body, userId: user._id });
      res.json({ success: true, message: "post", data });
    } else {
      const data = await Notes.findByIdAndUpdate(id, req.body);
      res.json({ success: true, message: "id update", data });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.all = async function (req, res) {
  try {
    const data = await Notes.find({
      title: req.body.title,
      discription: req.body.discription,
    });
    if (!data) {
      const user = await Notes.find({});
      res.json({ success: true, message: "data found successs", user });
    }
    res.json({ success: true, message: "title get ", data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
