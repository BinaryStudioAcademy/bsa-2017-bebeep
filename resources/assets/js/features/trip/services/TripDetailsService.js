import moment from 'moment';
import _ from 'lodash';

import DateTimeHelper from 'app/helpers/DateTimeHelper';
import { simpleRequest } from 'app/services/RequestService';

const TripDetailsService = {
    getDetails(id) {
        return simpleRequest.get(`/api/v1/trips/${id}/detail`)
            .then(
                response => Promise.resolve(this.transformData(response.data.data)),
                error => Promise.reject(error.response.data)
            );
    },

    transformData(response) {
        response.trip.price = parseInt(response.trip.price);
        this.setUsersAge(response);

        return response;
    },

    setUsersAge(data) {
        data.driver.data.age = DateTimeHelper.getUserYearsOld(data.driver.data.birth_date);

        data.routes.data.map((route) => {
            route.bookings.data = route.bookings.data.map((booking) => {
                booking.user.data.age = DateTimeHelper.getUserYearsOld(booking.user.data.birth_date);
                return booking;
            });
            return route;
        });
    },

    getFreeSeats(maxSeats, routes) {
        const reservedSeats = _.sumBy(routes, 'reserved_seats');
        return maxSeats - reservedSeats;
    }
};

export default TripDetailsService;
