import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({

  id_account: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    trim: true,
    required: true,
  }
});

export default mongoose.model("Admin", adminSchema);


