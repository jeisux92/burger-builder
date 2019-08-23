import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "./actionTypes";
import axios from "axios";

export const authStart = () => ({
  type: AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: AUTH_SUCCESS,
  token: token,
  userId: userId
});

export const authFail = error => ({
  type: AUTH_FAIL,
  error: error
});

const logOut = () => ({ type: AUTH_LOGOUT });

export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkfgZ59qvblKzjkMUvclUR2p4Cei1hd-A";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkfgZ59qvblKzjkMUvclUR2p4Cei1hd-A";
    }
    axios
      .post(url, user)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
