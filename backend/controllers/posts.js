/** @format */

import PostMessage from "../models/postMessage.js";

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
