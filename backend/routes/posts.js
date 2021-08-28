/** @format */

import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
const router = express.Router();

//localhost/posts/
router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id" , deletePost);

export default router;
