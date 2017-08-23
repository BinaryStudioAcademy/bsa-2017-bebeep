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
            response.trip.start_at + '0000', 'YYYY-MM-DD HH:mm:ss Z'
        ).local().format('llll');

        response.trip.price = parseInt(response.trip.price);

        response.driver.data.age = moment().diff(response.driver.data.birth_date, 'years');

        return response;
    }
};

export default EditTripService;
