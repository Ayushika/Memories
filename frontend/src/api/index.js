/** @format */

import axios from "axios";

axios.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchPosts = () => axios.get("/posts");
export const createNewPost = (newpost) => axios.post("/posts", newpost, config);
export const updatePost = (id, post) => axios.put(`/posts/${id}`, post, config);
export const deletePost = (id) => axios.delete(`/posts/${id}`);
export const likePost = (id) => axios.put(`/posts/${id}/likePost`);
export const signIn = (formData) =>
  axios.post("/user/signin", formData, config);
export const signUp = (formData) =>
  axios.post("/user/signup", formData, config);
