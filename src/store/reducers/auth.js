import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT
} from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
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

const setAuthRedirectPath = (state, action) => updateObject(state, { authRedirectPath: action.path })

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
    case SET_AUTH_REDIRECT:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
