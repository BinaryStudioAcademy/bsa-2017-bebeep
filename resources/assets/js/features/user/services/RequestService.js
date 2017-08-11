import { MakeRequest } from '../../../app/services/RequestService';
import { RegisterValidate, VerifyValidator, RegisterValidator } from '../../../app/services/UserService';

export const PasswordRequest = {
    forgotPassword(email) {
        const valid = RegisterValidator.email(email);
        if (!valid.valid) {
            return Promise.reject({email: valid.error});
        } else {
            return MakeRequest('post', '/api/authorization', {
                email: email,
                type: 'reset-password'
            }).then(
                response => Promise.resolve(response.data),
                error =>Promise.reject(error.response.data)
            );
        }
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
        return MakeRequest('put', `/api/users/${data.email}/password`, {
            password: data.password
        }, {
            headers: {'Token': data.token}
        })
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    }
};

export const RegisterRequest = {
    doRegister(data) {
        const validate = RegisterValidate(data);
        if (validate.valid) {
            return MakeRequest('post', '/api/user/register', data)
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
            return MakeRequest('post', '/api/user/verify', {
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

const RequestService = {
    PasswordRequest,
    RegisterRequest
};

export default RequestService;