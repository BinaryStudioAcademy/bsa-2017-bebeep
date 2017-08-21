import { securedRequest } from 'app/services/RequestService';

const BookingService = {
    getBookings(id) {
        let response;
        return response = [
            {
                id: 1,
                first_name: 'Misha',
                last_name: 'Markelov',
                phone: '123456789'
            },{
                id: 2,
                first_name: 'Caeqb',
                last_name: 'Dqwejzo',
                phone: '987653122'
            },{
                id: 3,
                first_name: 'Dashq',
                last_name: 'Qeadqw',
                phone: '416564121'
            },
        ];
        /*return securedRequest.get('/api/v1/trips/' + id + '/bookings)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );*/

    },
    getBookingsCount(data) {
        if (!data) return null;
        return data.length;
    },
    updateBookingStatus(trip_id, booking_id, status) {
        const url = '/api/v1/trips/' + trip_id + '/bookings/' + booking_id + '/status';
        return securedRequest.put(url, status)
            .then(
                response => Promise.resolve(response.data)
            )
    }
};

export default BookingService;