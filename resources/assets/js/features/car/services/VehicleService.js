import { simpleRequest, securedRequest } from '../../../app/services/RequestService';

const VehicleService = {

    getVehicles() {
        return securedRequest.get('/api/v1/car')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    }

};

export default VehicleService;