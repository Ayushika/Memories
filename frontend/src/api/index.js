/** @format */

import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchPosts = () => axios.get("/posts");
export const createNewPost = (newpost) => axios.post("/posts", newpost, config);
