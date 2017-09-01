import { simpleRequest } from 'app/services/RequestService';

const PublicProfileService = {

    getDriverProfile(id) {
        return simpleRequest.get('/api/v1/driver/' + id)
            .then(response => {
                response => Promise.resolve(response.data.data),
                error => Promise.reject(error.response.data)
            });
    },

};

export default PublicProfileService;
