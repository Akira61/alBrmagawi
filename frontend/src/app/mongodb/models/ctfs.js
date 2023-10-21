import mongoose from "mongoose";

const ctfSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  level: String,
  rating: Number,
  userOwns: Number,
  systemOwns: Number,
  machineType: String,
  flag: String,
  description: String,
});
export const ctfs = mongoose.model("ctfs", ctfSchema);
