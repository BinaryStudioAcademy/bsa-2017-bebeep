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

/*
USER_PROFILE_EDIT
USER_PASSWORD_CHANGE
USER_AVATAR_CHANGE
 */
const profileData = {
    'first_name': 'Ruslan',
    'last_name': 'Dan',
    'email': 'example@gmail.com',
    'phone': '380959996655',
    'birth_date': '1975-04-10'
};

export function editProfile() {
    return {
        type: actions.USER_PROFILE_EDIT,
        user: profileData,
    };
};
