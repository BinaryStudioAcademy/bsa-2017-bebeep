import * as actions from './actionTypes';

export const registerSuccess = data => ({
    type: actions.USER_REGISTER_SUCCESS,
    data
});

export const registerFailed = data => ({
    type: actions.USER_REGISTER_FAILED,
    data
});

export const verifySuccess = data => ({
    type: actions.USER_VERIFY_SUCCESS,
    data
});

export const verifyFailed = data => ({
    type: actions.USER_VERIFY_FAILED,
    data
});

export const forgotPasswordSuccess = () => ({
    type: actions.USER_PASSWORD_FORGOT_SUCCESS
});

export const forgotPasswordFailed = (error) => ({
    type: actions.USER_PASSWORD_FORGOT_FAILED,
    error
});

export const resetPasswordSuccess = () => ({
    type: actions.USER_PASSWORD_RESET_SUCCESS
});

export const resetPasswordFailed = (error) => ({
    type: actions.USER_PASSWORD_RESET_FAILED,
    error
});