import { securedRequest } from '../../../app/services/RequestService';
import moment from 'moment';

const EditTripService = {
    getTrip(id) {
        return securedRequest.get('/api/v1/trips/show/' + id)
            .then(
                // В TripService.php нужно изменить метод show,
                // тогда будет возвращаться один элемент
                // и можно будет написать response.data и error.response.data
                response => Promise.resolve(response.data[0]),
                error => Promise.reject(error.response.data[0])
            );
    },
    transformData(response) {
        response.start_at = moment.utc(response.start_at +`0000`, "YYYY-MM-DD HH:mm:ss Z").local().format("YYYY-MM-DDThh:mm");
        response.price = parseInt(response.price);
        return response;
    },
    sendUpdatedTrip(id, data) {
        const tripUrl = '/api/v1/trips/' + id;
        return securedRequest.put(tripUrl, data)
            .then(
                response => Promise.resolve(response.data)
            )
    }
};

export default EditTripService;
