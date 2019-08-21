import {
    AUTH_FAIL,
    AUTH_START,
    AUTH_SUCCESS
} from "./actionTypes"
import axios from "axios";


export const authStart = () => ({
    type: AUTH_START
})

export const authSuccess = (authData) => ({
    type: AUTH_SUCCESS,
    authData: authData
})

export const authFail = (error) => ({
    type: AUTH_FAIL,
    error: error
})

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart(email, password));
        axios.get("")
            .then(response => dispatch(authSuccess(response.data)))
            .catch(error => dispatch(authFail(error)))
    }
}