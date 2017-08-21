import { securedRequest } from 'app/services/RequestService';

const BookingService = {
    getBookings(id) {
        let response;
        return response = [
            {
                booking_id: 1,
                first_name: 'Misha',
                last_name: 'Markelov',
                img: 'http://findicons.com/files/icons/1072/face_avatars/300/a02.png'
            },{
                booking_id: 2,
                first_name: 'Dany',
                last_name: 'Stone',
                img: 'http://findicons.com/files/icons/1072/face_avatars/300/a03.png'
            },{
                booking_id: 3,
                first_name: 'Angela',
                last_name: 'Minoy',
                img: 'http://findicons.com/files/icons/1072/face_avatars/300/fh02.png'
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
    updateBookingStatus(trip_id, booking_id, data) {
        const url = '/api/v1/trips/' + trip_id + '/bookings/' + booking_id + '/status';
        return securedRequest.put(url, data)
            .then(
                response => Promise.resolve(response.data)
            )
    }
};

export default BookingService;