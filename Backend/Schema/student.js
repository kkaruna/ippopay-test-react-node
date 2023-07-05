const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../db');

const StudentSchema = new Schema({
  name: String,
  email: String,
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
