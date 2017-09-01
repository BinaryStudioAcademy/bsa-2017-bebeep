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

        this.setDriverAge(response);
        this.transformRoutesData(response);

        return response;
    },

    setDriverAge(data) {
        data.driver.data.age = DateTimeHelper.getUserYearsOld(data.driver.data.birth_date);
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
    },

    getRouteFreeSeats(maxSeats, reservedSeats) {
        return maxSeats - reservedSeats;
    },

    getMapDestination(routes) {
        return new Promise((resolve, reject) => {
            const startPoint = routes[0].from,
                endPoint = routes[routes.length - 1].to,
                waypoints = _.reduce(routes.slice(0, -1), (arr, route) => {
                    const latLng = new google.maps.LatLng(parseFloat(route.to.lat),parseFloat(route.to.lng));
                    arr.push({location: latLng, stopover: true});
                    return arr;
                }, []),
                directionsService = new google.maps.DirectionsService();

            directionsService.route({
                origin: startPoint,
                destination: endPoint,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    resolve(result, status);
                } else {
                    reject(result, status);
                }
            });
        });
    }
};

export default TripDetailsService;
