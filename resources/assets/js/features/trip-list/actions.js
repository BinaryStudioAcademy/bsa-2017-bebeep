import * as actions from './actionTypes';

import { getPassengerAvatar } from 'app/services/PhotoService';

export const tripsLoadSuccess = payload => {
    const data = _.reduce(payload.data, (result, data) => {
        const vehicle = data.vehicle.data,
            routes = _.reduce(data.routes.data, (routes, route) => {
                routes[route.id] = route;
                return routes;
            }, {}),
            bookings = _.reduce(data.bookings.data, (bookings, booking) => {
                const user = booking.user.data;
                user.photo = getPassengerAvatar(user);

                booking.user = user;
                bookings[booking.id] = booking;

                return bookings;
            }, {}),
            trip = {
                ...data,
                vehicle: vehicle.id,
                routes: Object.keys(routes),
                bookings: Object.keys(bookings)
            };

        result.vehicles[vehicle.id] = vehicle;
        result.routes = Object.assign(result.routes, routes);
        result.bookings = Object.assign(result.bookings, bookings);
        result.trips[trip.id] = trip;
        result.list.push(trip.id);

        return result;
    }, {
        list: [],
        trips: {},
        vehicles: {},
        routes: {},
        bookings: {}
    });

    return {
        type: actions.TRIPS_LOAD_SUCCESS,
        data
    }
};

export const tripsFilterChanged = payload => ({
    type: actions.TRIPS_FILTER_CHANGED,
    payload
});

export const changeBookingStatus = (id, booking) => ({
    type: actions.TRIPS_BOOKING_STATUS_CHANGE,
    id,
    booking
});
