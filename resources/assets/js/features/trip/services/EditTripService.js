import { securedRequest } from '../../../app/services/RequestService';

const EditTripService = {
    getTrip() {
        return securedRequest.get('/api/v1/trips')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },
};

export default EditTripService;