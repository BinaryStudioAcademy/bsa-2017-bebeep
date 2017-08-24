import { securedRequest } from 'app/services/RequestService';
import { browserHistory } from 'react-router';

const EditVehicleService = {
    getVehicle(id) {
        return securedRequest.get('/api/v1/car/' + id)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    sendUpdatedVehicle(id, data) {
        const tripUrl = '/api/v1/car/' + id;

        return securedRequest.put(tripUrl, data).then((response) => {
            Promise.resolve(response.data);
            if (response.status === 200) {
                browserHistory.push('/vehicles');
            }
        })
    }
};

export default EditVehicleService;