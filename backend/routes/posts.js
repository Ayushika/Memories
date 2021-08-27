/** @format */

import express from "express";
import { getPosts } from "../controllers/posts.js";
const router = express.Router();

//localhost/posts/
router.get("/", getPosts);

export default router;
