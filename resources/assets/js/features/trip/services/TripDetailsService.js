import moment from 'moment';

import { simpleRequest } from 'app/services/RequestService';

const EditTripService = {
    getDetails(id) {
        return simpleRequest.get(`/api/v1/trips/${id}/detail`)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    transformData(response) {
        response.trip.start_at = moment.utc(
            response.trip.start_at +`0000`, "YYYY-MM-DD HH:mm:ss Z"
        ).local().format("YYYY-MM-DDThh:mm");

        response.trip.price = parseInt(response.trip.price);
        return response;
    }
};

export default EditTripService;
