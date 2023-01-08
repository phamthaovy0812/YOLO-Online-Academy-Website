import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema = new mongoose.Schema({
  avatar:{
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  isBlock :{
    type : Boolean,
    default : false 
  }
});

accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

accountSchema.method.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

export default mongoose.model("Account", accountSchema);
