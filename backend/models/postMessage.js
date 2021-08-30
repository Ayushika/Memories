/** @format */

import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  selectedFile: {
    type: String,
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
