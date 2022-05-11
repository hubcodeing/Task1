const { default: mongoose } = require("mongoose");
const Notes = require("../models/notes");
const Login = require("../models/user");
const { ObjectId } = require("mongodb");
const { infoLogger, errorLogger } = require("../../logger");
exports.user = async (req, res) => {
  try {
    infoLogger.info(req.body, req.user._id);
    const notes = await Notes({ ...req.body, userId: req.user._id });
    const data = await notes.save();
    res
      .status(200)
      .json({ success: true, message: " data post  successfully", data });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.get = async function (req, res) {
  try {
    const notes = await Notes.find({});
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.getid = async function (req, res) {
  try {
    infoLogger.info(req.params.id);
    const notes = await Notes.findById(req.params.id);
    if (!notes) throw new Error("data not find ");
    else res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
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
    res.status(200).json({
      success: true,
      message: "data update    in notes",
      data,
    });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.note = async function (req, res) {
  try {
    const notes = await Notes.findByIdAndDelete(req.params.id);
    if (!notes) throw new Error("id is not found");
    res.status(200).json({
      success: true,
      message: " data delete successfully",
      data: notes,
    });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.match = async function (req, res) {
  try {
    const notes = await Notes.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.body.id) } },
    ]);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.project = async function (req, res) {
  try {
    const notes = await Notes.aggregate([
      { $project: { _id: 0, discription: 1 } },
    ]);

    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.addfilds = async function (req, res) {
  try {
    const notes = await Notes.aggregate([{ $addFields: { age: 50 } }]);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
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
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
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
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
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
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "data get", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.combine = async function (req, res) {
  try {
    const id = req.body.id;
    if (!id) {
      const data = await Notes.create({ ...req.body, userId: req.body.id });
      infoLogger.info(data);
      res.status(200).json({ success: true, message: "post", data });
    } else {
      const data = await Notes.findByIdAndUpdate(id, req.body);
      infoLogger.info(data);
      res.status(200).json({ success: true, message: "id update", data });
    }
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.jjj = async function (req, res) {
  try {
    let filter = {};
    if (req.query.title) {
      filter = { ...filter, title: req.query.title };
    }
    if (req.query.discription) {
      filter = { ...filter, discription: req.query.discription };
    }
    if (req.query.age) {
      filter = { ...filter, age: req.query.age };
    }
    const notes = await Notes.find(filter);
    infoLogger.info(notes);
    res.status(200).json({ success: true, message: "title get ", notes });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
