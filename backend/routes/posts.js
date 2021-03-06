/** @format */

import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

//localhost/posts/

router.get("/search" ,getPostsBySearch)
router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.put("/:id/likePost", auth, likePost);

export default router;
