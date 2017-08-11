import { makeRequest } from '../../../app/services/RequestService';

const UserService = {
    resetPassword(email, token, password) {
        return makeRequest('put', `/api/users/${email}/password`, {
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
