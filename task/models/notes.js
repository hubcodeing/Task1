const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
  age: {
    type: Array,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
module.exports = mongoose.model("Notes", notesSchema);
