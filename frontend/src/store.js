/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { PostReducer } from "./reducers/PostReducer";
import { AuthReducer } from "./reducers/AuthReducer";

const reducers = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
