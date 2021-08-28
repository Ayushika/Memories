/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {PostReducer} from "./reducers/PostReducer";

const reducers = combineReducers({
  posts : PostReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
