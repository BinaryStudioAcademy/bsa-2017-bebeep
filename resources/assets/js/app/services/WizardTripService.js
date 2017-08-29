import {securedRequest} from 'app/services/RequestService';
import {browserHistory} from 'react-router';

export const INIT = 0;
export const STEP_ONE = 1;
export const STEP_TWO = 2;
export const STEP_THREE = 3;

export const savePendingTrip  = (tripData) => {

    return securedRequest.post('/api/v1/trips', {
        start_at: tripData.start_at,
        end_at: tripData.end_at,
        from: tripData.from,
        to: tripData.to,
        price: tripData.price,
        seats: tripData.seats,
        waypoints: [],
        vehicle: {
            brand: tripData.brand,
            model: tripData.model,
            seats: tripData.seats,
        },
    }).then(
            reponse => {
                browserHistory.push('/trips');
                return Promise.resolve(reponse);
            },
            error => {
                browserHistory.push('/trips');
                console.error(error);
                return Promise.resolve({});
            }
    );
};
