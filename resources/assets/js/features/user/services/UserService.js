import { simpleRequest, securedRequest } from 'app/services/RequestService';

const UserService = {

    getProfileGeneral() {
        return securedRequest.get('/api/user/profile')
            .then(
                response => Promise.resolve(response.data.data),
                error => Promise.reject(error.response.data)
            );
    },

    getProfileAvatar() {
        return securedRequest.get('/api/user/profile/avatar')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    updateProfileGeneral(updatedData) {
        return securedRequest.put('/api/user/profile', updatedData)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    updateProfileAvatar(updatedData) {
        return securedRequest.put('/api/user/profile/avatar', updatedData)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    updateProfilePassword(updatedData) {
        return securedRequest.put('/api/user/profile/password', updatedData)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    deleteProfileAvatar() {
        return securedRequest.delete('/api/user/profile/avatar')
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
