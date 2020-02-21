import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignedUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEAZBWOMx0ndYjk7e1MlTqD_8Be0wJ3ZA";
    if (!isSignedUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEAZBWOMx0ndYjk7e1MlTqD_8Be0wJ3ZA";
    }
    axios
      .post(url, authData)
      .then(resp => {
        dispatch(authSuccess(resp.data));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};
