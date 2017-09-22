import { securedRequest } from 'app/services/RequestService';
import CurrencyService from 'features/currency/services/CurrencyService';

export const INIT = 0;
export const STEP_ONE = 1;
export const STEP_TWO = 2;
export const STEP_THREE = 3;

export const savePendingTrip = (tripData) => {
    const currency = CurrencyService.getActiveCurrency();

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
        routes: [{
            start_at: tripData.start_at,
            end_at: tripData.end_at
        }],
        currency_id: currency ? currency.id : null
    }).then(
        response => Promise.resolve(response),
        error => Promise.resolve({})
    );
};

export const prepareNumber = (value) => {
    const number = value.match(/[0-9]+/);

    return number && !isNaN(+number[0]) && +number[0] > 0
        ? +number[0]
        : 0;
};

export const isTripReady = (data) => {
    return !(
        _.isEmpty(data.from)
        &&
        _.isEmpty(data.to)
        &&
        data.start_at === null
        &&
        data.end_at === null
        &&
        data.seats <= 0
        &&
        data.price <= 0
        &&
        _.isEmpty(data.brand)
        &&
        _.isEmpty(data.model)
    );
};
