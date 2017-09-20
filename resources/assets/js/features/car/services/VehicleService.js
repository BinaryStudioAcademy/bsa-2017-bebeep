import { securedRequest } from 'app/services/RequestService';
import { browserHistory } from 'react-router';

export const VehicleService = {

    saveVehicleData(data) {
        securedRequest.post('/api/v1/car', data).then((response) => {
            if (response.status === 200) {
                browserHistory.push('/vehicles');
            }
        }).catch((error) => {});
    }

};
