import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxLength: [18, "password limit exceed"],
    minLength: [8, "password length should me more then 8 character or 8"],
    required: true,
    select:false
  },
  confirmPassword: {
    type: String,
    select:false,
    maxLength: [18, "password limit exceed"],
    minLength: [8, "password length should me more then 8 character or 8"],
  },
  role: {
    type: String,
    default: "user",
  },
  createAt:{
    type:Date,
    default:Date.now
  }
});

export default mongoose.model("user", userSchema);
