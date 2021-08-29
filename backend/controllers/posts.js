/** @format */

import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body; 
  try {
    const newPost = await PostMessage.create(post);
    if (newPost) res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, id },
    { new: true },
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");

  await PostMessage.findByIdAndRemove(id);
  res.status(200).send("Deleted Successfully");
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post with that id");
  }

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true },
  );

  res.json(updatedPost);
};
