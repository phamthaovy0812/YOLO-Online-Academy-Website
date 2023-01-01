import mongoose from "mongoose";

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
  },
  fullname: {
    type: String, 
    required: true,
  },
  wishlist: [objectCourse],
  courses_enroll: [objectCourse],
});

export default mongoose.model("Student", studentSchema);


