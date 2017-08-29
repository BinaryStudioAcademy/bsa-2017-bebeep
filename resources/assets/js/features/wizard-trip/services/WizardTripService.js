import {securedRequest} from 'app/services/RequestService';

export const INIT = 0;
export const STEP_ONE = 1;
export const STEP_TWO = 2;
export const STEP_THREE = 3;

export const savePendingTrip  = (tripData) => {
    return securedRequest.post('/api/v1/trips', {
        start_at: tripData.start_at,
        end_at: tripData.end_at,
        from: tripData.from.place,
        to: tripData.to.place,
        price: tripData.price,
        seats: tripData.seats,
        waypoints: [],
        vehicle: {
            'brand': tripData.brand,
            'model': tripData.model,
        },
    });
};
