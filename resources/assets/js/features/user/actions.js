import * as actions from './actionTypes';
import axios from 'axios';
import { RegisterValidator } from '../../app/services/UserService';

import { getAuthToken, initSession, destroySession } from '../../app/services/AuthService';

export const registerSuccess = data => ({
    type: actions.USER_REGISTER_SUCCESS,
    data
});

export const loginSuccess = data => ({
    type: actions.LOGIN_SUCCESS,
    data
});

export const loginFormFailed = data => ({
    type: actions.LOGIN_VERIFY_FAILED,
    data
});

function processFailedLoginResponse(response) {
    switch (response.status) {
        case 401:
            return {
                type: actions.LOGIN_FAILED_NO_ACTIVATION,
                response
            };
        case 404:
            return {
                type: actions.LOGIN_FAILED_NO_USER,
                response
            };
        case 422:
            return {
                type: actions.LOGIN_FAILED_BAD_CREDENTIALS,
                response
            }
        default:
            return {
                type: actions.LOGIN_FAILED,
                response
            }
    }
};

export const doLogin = (credentials) => dispatch => {
    const emailValid = RegisterValidator.email(credentials.email);
    const passwordValid = RegisterValidator.password(credentials.password);

    if (!emailValid.valid) {
        return dispatch(loginFormFailed({ email: emailValid.error }));
    }

    if (!passwordValid.valid) {
        return dispatch(loginFormFailed({ password: passwordValid.error }));
    }

    axios.post('/api/user/authorization', {
        email: credentials.email,
        password: credentials.password
    })
        .then(response => {
            initSession(response.data.token);
            dispatch(loginSuccess(response.data))
        })
        .catch(error => {
            destroySession();
            dispatch(processFailedLoginResponse(error.response))
        });

};

export const logoutSuccess = response => ({
    type: actions.LOGOUT_SUCCESS,
    response
});

export const logoutFailed = response => ({
    type: actions.LOGOUT_FAILED,
    response
});

export const doLogout = (data) => {
    const token = getAuthToken();
    const axiosLogout = axios.create();

    return dispatch => {
        axiosLogout.defaults.headers.post['Authorization'] = "Bearer " + token;

        axiosLogout.post('/api/user/logout', {
            token: token
        })
            .then(response => {
                destroySession();
                dispatch(logoutSuccess(response))
            })
            .catch(error => {
                dispatch(logoutFailed(error.response))
            });
    }
};
