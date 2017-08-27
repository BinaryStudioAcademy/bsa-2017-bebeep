import * as actions from './actionTypes';

import { UserValidator } from 'app/services/UserService';
import { simpleRequest, securedRequest } from 'app/services/RequestService';
import { getAuthToken, initSession, destroySession } from 'app/services/AuthService';


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

export const updateProfileSuccess = data => ({
    type: actions.USER_PROFILE_UPDATE_SUCCESS,
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
            };
        default:
            return {
                type: actions.LOGIN_FAILED,
                response
            }
    }
}

export const doLogin = (credentials) => dispatch => {
    const emailValid = UserValidator.email(credentials.email);
    const passwordValid = UserValidator.password(credentials.password);

    if (!emailValid.valid) {
        return dispatch(loginFormFailed({ email: emailValid.error }));
    }

    if (!passwordValid.valid) {
        return dispatch(loginFormFailed({ password: passwordValid.error }));
    }

    simpleRequest.post('/api/user/authorization', {
        email: credentials.email,
        password: credentials.password
    })
        .then(response => {
            initSession(response.data.token);
            dispatch(loginSuccess(response.data))
        })
        .catch(error => {
            if (error.response) {
                destroySession();
                dispatch(processFailedLoginResponse(error.response))
            } else {
                console.error(error);
            }
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

    return dispatch => {
        securedRequest.post('/api/user/logout', {
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
