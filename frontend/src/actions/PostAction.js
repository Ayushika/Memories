/** @format */

import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_All", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  console.log(post);
  try {
    const { data } = await api.createNewPost(post);
    console.log(data);

    dispatch({ type: "CREATE_POST", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
