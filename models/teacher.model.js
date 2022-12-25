import mongoose from "mongoose";


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

export default mongoose.model("Teacher", teacherSchema);


