import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};
const authStart = state =>
  updateObject(state, {
    loading: true,
    error: null
  });

const authSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    token: action.token,
    userId: action.userId
  });

const authFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: action.error
  });

const authLogOut = state =>
  updateObject(state, {
    token: null,
    tokenId: null
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogOut(state);
    default:
      return state;
  }
};

export default reducer;
