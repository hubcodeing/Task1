const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  employeeid: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
});
module.exports = mongoose.model("Employee", employeeSchema);
