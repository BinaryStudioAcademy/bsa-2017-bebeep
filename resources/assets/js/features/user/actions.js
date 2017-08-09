import * as actions from './actionTypes';
import axios from 'axios';

export const registerSuccess = data => ({
    type: actions.REGISTER_SUCCESS,
    data
});

export const registerFailed = data => ({
    type: actions.REGISTER_FAILED,
    data
});

export const doRegister = (data) => {
    return dispatch => {
        axios.post('/api/user/register', data)
            .then(response => dispatch(registerSuccess(response.data)))
            .catch(error => dispatch(registerFailed(error.response.data)));
    };
};

export const verifySuccess = data => ({
    type: actions.REGISTER_VERIFY_SUCCESS,
    data
});

export const verifyFailed = data => ({
    type: actions.REGISTER_VERIFY_FAILED,
    data
});

export const doVerify = (email, token) => dispatch => {
    axios.post('/api/user/verify', {
        email: email,
        token: token
    })
    .then(response => dispatch(verifySuccess(response.data)))
    .catch(error => dispatch(verifyFailed(error.response.data)));
};