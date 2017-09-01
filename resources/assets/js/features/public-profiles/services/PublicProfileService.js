import moment from 'moment';
import _ from 'lodash';

import DateTimeHelper from 'app/helpers/DateTimeHelper';

const PublicProfileService = {

    transformData(response) {
        //response.created_at = DateTimeHelper.dateFormat(response.created_at);

        /*this.setDriverAge(response);
        this.transformRoutesData(response);*/

        return response;
    },

    setDriverAge(data) {
        data.driver.data.age = DateTimeHelper.dateFormat(data.created_at);
    },

    transformRoutesData(data) {
        data.routes.data.map((route) => {
            route.free_seats = this.getRouteFreeSeats(data.trip.seats, route.reserved_seats);

            route.bookings.data = route.bookings.data.map((booking) => {
                booking.user.data.age = DateTimeHelper.getUserYearsOld(booking.user.data.birth_date);
                return booking;
            });
            return route;
        });
    }
};

export default PublicProfileService;
