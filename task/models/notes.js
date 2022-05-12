import mongoose from "mongoose";

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
const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
