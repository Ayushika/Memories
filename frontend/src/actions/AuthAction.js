/** @format */

import * as api from "../api";
import {} from "../constants/ActionTypes";

export const signUp = (formData, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
