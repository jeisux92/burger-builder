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

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkfgZ59qvblKzjkMUvclUR2p4Cei1hd-A"
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkfgZ59qvblKzjkMUvclUR2p4Cei1hd-A";
        }
        axios.post(url, user)
            .then(response => dispatch(authSuccess(response.data)))
            .catch(error => dispatch(authFail(error)))
    }
}