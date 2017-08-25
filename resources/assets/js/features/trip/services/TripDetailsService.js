import moment from 'moment';
import _ from 'lodash';

import { simpleRequest } from 'app/services/RequestService';

const TripDetailsService = {
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
    },

    getPossibleSeats(maxSeats, routes) {
        const busySeats = _.sumBy(routes, 'busy_seats');

        return maxSeats - busySeats;
    }
};

export default TripDetailsService;
