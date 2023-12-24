import mongoose from "mongoose";

const imageModal = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required:true
  },
  access: {
    type: String,
    required: true,
  },
  UploadedOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("images", imageModal);
