import { securedRequest } from '../../../app/services/RequestService';
import moment from 'moment';

const EditTripService = {
    getTrip() {
        /*return securedRequest.get('/api/v1/trips')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );*/
    },
    convertTime(time) {
        return moment.unix(time).format("YYYY-MM-DDThh:mm");
    }
};

export default EditTripService;