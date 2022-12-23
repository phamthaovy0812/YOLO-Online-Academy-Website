const mongoose = require("mongoose");


const teacherSchema = new mongoose.Schema({

  id_account: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  skill: {
    type: String
  },
  description: {
    type: String,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
