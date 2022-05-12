import mongoose from "mongoose";

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
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
