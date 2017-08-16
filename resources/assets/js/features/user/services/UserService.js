import { simpleRequest, securedRequest } from '../../../app/services/RequestService';

const UserService = {

    getProfileGeneral() {
        return securedRequest.get('/api/user/profile')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    resetPassword(email, token, password) {
        return simpleRequest.put('/api/v1/password-resets', {
            email: email,
            password: password
        }, {
            headers: {'Token': token}
        })
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },
};

export default UserService;
