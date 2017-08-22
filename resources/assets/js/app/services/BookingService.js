import { securedRequest } from 'app/services/RequestService';

const BookingService = {
    getBookings(id) {
        let response;
        return response = [
            {
                booking_id: 1,
                first_name: 'Misha',
                last_name: 'Markelov',
                img: 'https://pickaface.net/assets/images/slides/slide4.png'
            },{
                booking_id: 2,
                first_name: 'Steve',
                last_name: 'Jobs',
                img: 'https://pickaface.net/assets/images/slides/slide2.png'
            },{
                booking_id: 3,
                first_name: 'Angela',
                last_name: 'Minoy',
                img: 'https://pickaface.net/assets/images/slides/slide1.png'
            }
        ];
        /*return securedRequest.get('/api/v1/trips/' + id + '/bookings')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );*/
    },
    getBookingsCount(data) {
        if (!data) return null;
        return data.length;
    },
    updateBookingStatus(trip_id, booking_id, data) {
        const url = '/api/v1/trips/' + trip_id + '/bookings/' + booking_id + '/status';
        return securedRequest.put(url, data)
            .then(
                response => Promise.resolve(response.data)
            )
    },
    validateBooking(iStart, iEnd, seats, possibleSeats) {
        let errors = {};

        if (iStart < 0) {
            errors.start = 'Start point not found';
        }
        if (iEnd < 0) {
            errors.end = 'End point not found';
        }
        if (iStart > iEnd) {
            errors.end = "Incorrect end point"
        }
        if (possibleSeats < seats) {
            errors.seats = `You can book ${possibleSeats} seats`;
        }
        return errors;
    }
};

export default BookingService;