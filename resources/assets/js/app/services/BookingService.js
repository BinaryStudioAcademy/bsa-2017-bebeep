import { securedRequest } from 'app/services/RequestService';

const BookingService = {
    getBookings(id) {
        let response;
        return response = [
            {
                first_name: 'Misha',
                last_name: 'Markelov',
                phone: '123456789'
            },{
                first_name: 'Caeqb',
                last_name: 'Dqwejzo',
                phone: '987653122'
            },{
                first_name: 'Dashq',
                last_name: 'Qeadqw',
                phone: '416564121'
            },
        ];
        /*return securedRequest.get('/api/v1/booking/' + id)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );*/

    },
    getBookingsCount(data) {
        if (!data) return null;
        return data.length;
    }
    /*
    transformData(response) {
        response.start_at = moment.utc(
            response.start_at +`0000`, "YYYY-MM-DD HH:mm:ss Z"
        ).local().format("YYYY-MM-DDThh:mm");

        response.price = parseInt(response.price);
        return response;
    },
    sendUpdatedTrip(id, data) {
        const tripUrl = '/api/v1/booking/' + id;
        return securedRequest.put(tripUrl, data)
            .then(
                response => Promise.resolve(response.data)
            )
    }*/
};

export default BookingService;