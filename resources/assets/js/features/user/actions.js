import * as actions from './actionTypes';
import axios from 'axios';

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
        axios.post('/api/user/register', data)
            .then(response => dispatch(registerSuccess(response.data)))
            .catch(error => dispatch(registerFailed(error.response.data)));
    };
};

export const registerValidate = data => {
    let validate = true;
    let errors = {};
    if (data.last_name.trim() === "") {
        validate = false;
        errors.last_name = "Last name is required";
    }
    if (data.first_name.trim() === "") {
        validate = false;
        errors.first_name = "First name is required";
    }
    if (!data.phone.match(/^[0-9]{1,15}$/)) {
        validate = false;
        errors.phone = "Phone is required, and must contain digits not more 15";
    }
    if (!data.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        validate = false;
        errors.email = "Invalid email";
    }
    if (data.birth_date.trim() === "") {
        validate = false;
        errors.birth_date = "Phone is required";
    }
    if (!data.role_driver && !data.role_passenger) {
        validate = false;
        errors.role = "Choose your role";
    }
    if (data.password.length < 6) {
        validate = false;
        errors.password = "Password must be more 6 characters";
    }
    if (data.password !== data.password_confirmation) {
        validate = false;
        errors.password_confirmation = "Repeated password does not match";
    }
    return {
        type: actions.USER_REGISTER_VALIDATE,
        validate,
        errors,
        data
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
    axios.post('/api/user/verify', {
        email: email,
        token: token
    })
    .then(response => dispatch(verifySuccess(response.data)))
    .catch(error => dispatch(verifyFailed(error.response.data)));
};