/** @format */

import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";
const router = express.Router();

//localhost/posts/
router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);

export default router;
