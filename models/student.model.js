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
const rating_list ={
  id_course : {
    type : String
  },
  scores : {
    type : String
  },
  comment : {
    type : String
  },
}
const studentSchema = new mongoose.Schema({

  id_account: {
    type: String, 
  },
  fullname: {
    type: String, 
    required: true,
  },
  wishlist: [objectCourse],
  rating_list : [rating_list],
  courses_enroll: [objectCourse],
  cart:[objectCourse]
});

export default mongoose.model("Student", studentSchema);


