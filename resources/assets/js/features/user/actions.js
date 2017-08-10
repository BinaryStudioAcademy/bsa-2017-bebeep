import * as actions from './actionTypes';
import axios from 'axios';
import {
    RegisterValidate,
    VerifyValidator,
    RegisterValidator,
    ProfileValidate,
    PasswordChangeValidate
} from '../../app/services/UserService';

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

export const getProfile = () => {
    return dispatch => {
        axios.get('/api/user/profile')
            .then(response => {
                console.log(response);
                dispatch({
                    type: actions.USER_PROFILE_GET_SUCCESS,
                    data: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const editProfile = (data) => {
    return dispatch => {
        const validate = ProfileValidate(data);

        if (validate.valid) {
            console.log(data);
            /*axios.post('/api/user/profile/edit', data)
                .then(response => {
                    console.log(response);
                    dispatch({
                        type: actions.USER_PROFILE_EDIT_SUCCESS
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: actions.USER_PROFILE_EDIT_FAILED,
                        data: error.response.data,
                    });
                });*/
        } else {
            dispatch({
                type: actions.USER_PROFILE_EDIT_FAILED,
                data: validate.errors,
            });
        }
    };

    /*USER_PROFILE_EDIT_SUCCESS
USER_PROFILE_EDIT_FAILED*/
};

export const changePassword = (data) => {
    return dispatch => {
        const validate = PasswordChangeValidate(data);

        if (validate.valid) {
            console.log(data);
            /*axios.post('/api/user/password/change', data)
                .then(response => {
                    console.log(response);
                    dispatch({
                        type: actions.USER_PASSWORD_CHANGE_SUCCESS
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: actions.USER_PASSWORD_CHANGE_FAILED,
                        data: error.response.data,
                    });
                });*/
        } else {
            dispatch({
                type: actions.USER_PASSWORD_CHANGE_FAILED,
                data: validate.errors,
            });
        }
    };
};
