import mongoose from "mongoose";

const objectCourse = {
  id_course : {
    type : String
  },
  name_course : {
    type : String
  },
  description : {
    type : String
  },
  avatar_course : {
    type : String
  },
};

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
  course_posted : [objectCourse],
  skill: {
    type: String,
    default : "gi"
  },
  description: {
    type: String,
    default:" "
  },
  isBlock:{
    type: Boolean,
    default: false,
  }
});

export default mongoose.model("Teacher", teacherSchema);