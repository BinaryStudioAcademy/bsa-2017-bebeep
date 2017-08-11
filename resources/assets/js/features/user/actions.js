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

export const loginFailed = data => ({
    type: data.code == 404 ? actions.LOGIN_FAILED_NOUSER : actions.LOGIN_FAILED_NOACTIVATION,
    data
});

export const loginSuccess = data => ({
    type: actions.LOGIN_SUCCESS,
    data
});


export const doLogin = (data) => {
    return dispatch => {
        axios.post('/api/user/authorization', data)
            .then(response => dispatch(loginSuccess(response.data)))
            .catch(error => dispatch(loginFailed(error.response.data)))
        ;
    }
}
