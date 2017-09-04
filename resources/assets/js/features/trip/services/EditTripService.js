import moment from 'moment';

import { securedRequest } from 'app/services/RequestService';

const EditTripService = {
    getTrip(id) {
        return securedRequest.get('/api/v1/trips/show/' + id)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },
    transformData(response) {
        response.start_at = moment.utc(
            response.start_at +`0000`, "YYYY-MM-DD HH:mm:ss Z"
        ).local().format("YYYY-MM-DD HH:mm");

        response.price = parseInt(response.price);
        return response;
    },
    sendUpdatedTrip(id, data) {
        const tripUrl = '/api/v1/trips/' + id;
        return securedRequest.put(tripUrl, data)
            .then(
                response => Promise.resolve(response.data)
            )
    }
};

export default EditTripService;
