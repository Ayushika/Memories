/** @format */

import {
  CREATE_POST,
  FETCH_ALL,
  DELETE_POST,
  UPDATE_POST,
  LIKE_POST,
} from "../constants/ActionTypes";

export const PostReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case UPDATE_POST:
    case LIKE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post,
      );

    case DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);

    case CREATE_POST:
      return [...posts, action.payload];

    default:
      return posts;
  }
};
