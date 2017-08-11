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

export const forgotPasswordSuccess = () => ({
    type: actions.USER_PASSWORD_FORGOT_SUCCESS
});

export const forgotPasswordFailed = (error) => ({
    type: actions.USER_PASSWORD_FORGOT_FAILED,
    error
});

export const forgotPassword = (email) => dispatch => {
    const valid = RegisterValidator.email(email);
    if (!valid.valid) {
        return dispatch(forgotPasswordFailed({email: valid.error}));
    } else {
        axios.post('/api/user/password/forgot', {
            email: email
        })
            .then(response => dispatch(forgotPasswordSuccess()))
            .catch(error => dispatch(forgotPasswordFailed(error.response.data)));
    }
};

export const resetPasswordSuccess = () => ({
    type: actions.USER_PASSWORD_RESET_SUCCESS
});

export const resetPasswordFailed = (error) => ({
    type: actions.USER_PASSWORD_RESET_FAILED,
    error
});

export const resetPassword = (data) => dispatch => {
    const validEmail = RegisterValidator.email(data.email),
        validPassword = RegisterValidator.password(data.password),
        validPasswordConfirmation = RegisterValidator.password_confirmation(data.password, data.password_confirmation),
        validToken = VerifyValidator.token(data.token);
    if (!validEmail.valid || !validPassword.valid || !validPasswordConfirmation.valid || !validToken.valid) {
        return dispatch(resetPasswordFailed({
            email: validEmail.error,
            password: validPassword.error,
            password_confirmation: validPasswordConfirmation.error,
            token: validToken.error,
        }));
    }
    return axios.post('/api/user/password/reset', {
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            token: data.token,
        })
            .then(response => dispatch(resetPasswordSuccess()))
            .catch(error => dispatch(resetPasswordFailed(error.response.data)));
};