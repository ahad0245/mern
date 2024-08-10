const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
