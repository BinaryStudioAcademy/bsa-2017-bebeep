import * as actions from './actionTypes';
import axios from 'axios';
import { RegisterValidate, VerifyValidator, RegisterValidator } from '../../app/services/UserService';

export const registerSuccess = data => ({
    type: actions.USER_REGISTER_SUCCESS,
    data
});

export const registerFailed = data => ({
    type: actions.USER_REGISTER_FAILED,
    data
});

export const doRegister = (data) => {
    return dispatch => {
        const validate = RegisterValidate(data);
        if (validate.valid) {
            axios.post('/api/user/register', data)
                .then(response => dispatch(registerSuccess(response.data)))
                .catch(error => dispatch(registerFailed(error.response.data)));
        } else {
            dispatch(registerFailed(validate.errors));
        }
    };
};

export const verifySuccess = data => ({
    type: actions.USER_VERIFY_SUCCESS,
    data
});

export const verifyFailed = data => ({
    type: actions.USER_VERIFY_FAILED,
    data
});

export const doVerify = (email, token) => dispatch => {
    const emailValid = RegisterValidator.email(email);
    const tokenValid = VerifyValidator.token(token);
    if (!emailValid.valid) {
        return dispatch(verifyFailed({email: emailValid.error}));
    }
    if (!tokenValid.valid) {
        return dispatch(verifyFailed({token: tokenValid.error}));
    } else {
        axios.post('/api/user/verify', {
            email: email,
            token: token
        })
            .then(response => dispatch(verifySuccess(response.data)))
            .catch(error => dispatch(verifyFailed(error.response.data)));
    }
};


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
            sessionStorage.setItem('jwt', response.data.token);
            dispatch(loginSuccess(response.data))
        })
        .catch(error => {
            sessionStorage.removeItem('jwt');
            dispatch(processFailedLoginResponse(error.response))
        });

};

export const logoutSuccess = data => ({
    type: actions.LOGOUT_SUCCESS,
    data
});

export const logoutFailed = data => ({
    type: actions.LOGOUT_FAILED,
    data
});

export const doLogout = (data) => {
    const token = sessionStorage.getItem('jwt');
    const axiosLogout = axios.create();

    return dispatch => {
        axiosLogout.defaults.headers.post['Authorization'] = "Bearer " + token;

        axiosLogout.post('/api/user/logout', {
            token: token
        })
            .then(response => {
                sessionStorage.removeItem('jwt');
                dispatch(logoutSuccess(response.data))
            })
            .catch(error => {
                dispatch(logoutFailed(error.response))
            });
    }
};