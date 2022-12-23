const mongoose = require("mongoose");

const objectCourse = {
  id_course : {
    type : String
  },
  name_course : {
    type : String
  },
  avatar_course : {
    type : String
  },
};
const studentSchema = new mongoose.Schema({

  id_account: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  wishlist: [objectCourse],
  courses_enroll: [objectCourse],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
