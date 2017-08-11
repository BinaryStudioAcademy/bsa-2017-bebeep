import { makeRequest } from '../../../app/services/RequestService';
import validate from 'validate.js';
import { RegisterValidate, VerifyValidator, RegisterValidator } from '../../../app/services/UserService';

const UserManager = {
    forgotPassword(email) {
        return makeRequest('post', '/api/authorization', {
            email: email,
            type: 'reset-password'
        }).then(
            response => Promise.resolve(response.data),
            error =>Promise.reject(error.response.data)
        );
    },

    resetPassword(data) {
        const validEmail = RegisterValidator.email(data.email),
            validPassword = RegisterValidator.password(data.password),
            validPasswordConfirmation = RegisterValidator.password_confirmation(data.password, data.password_confirmation),
            validToken = VerifyValidator.token(data.token);
        if (!validEmail.valid || !validPassword.valid || !validPasswordConfirmation.valid || !validToken.valid) {
            return Promise.reject({
                email: validEmail.error,
                password: validPassword.error,
                password_confirmation: validPasswordConfirmation.error,
                token: validToken.error,
            });
        }
        return makeRequest('put', `/api/users/${data.email}/password`, {
            password: data.password
        }, {
            headers: {'Token': data.token}
        })
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    doRegister(data) {
        const validate = RegisterValidate(data);
        if (validate.valid) {
            return makeRequest('post', '/api/user/register', data)
                .then(
                    response => Promise.resolve(response.data),
                    error => Promise.reject(error.response.data)
                );
        } else {
            return Promise.reject(validate.errors);
        }
    },

    doVerify(email, token) {
        const emailValid = RegisterValidator.email(email);
        const tokenValid = VerifyValidator.token(token);
        if (!emailValid.valid || !tokenValid.valid) {
            return Promise.reject({
                email: emailValid.error,
                token: tokenValid.error
            });
        } else {
            return makeRequest('post', '/api/user/verify', {
                email: email,
                token: token
            })
                .then(
                    response => Promise.resolve(response.data),
                    error => Promise.reject(error.response.data)
                );
        }
    }
};


export default UserManager;


