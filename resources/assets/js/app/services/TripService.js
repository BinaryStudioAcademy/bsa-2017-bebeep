import Validator from './Validator';
import moment from 'moment';
import { makeRequest } from './RequestService';

export const createTripRules = {
    vehicle_id: Validator.required('Please select a car'),
    start_at: Validator.required('Please enter trip start time'),
    end_at: Validator.required('Please enter trip end time'),
    from: Validator.required('Enter trip start point'),
    to: Validator.required('Enter trip end point'),
    price: [Validator.required('Enter trip price'), Validator.greaterThan(1, 'Trip price must be greater than 0')],
    seats: [Validator.required('Enter trip seats'), Validator.greaterThan(1, 'Trip seats must be greater than 0')]
};

export const getStartAndEndTime = (start_at, duration) => {
    if (!start_at) {
        return {
            start_at: null,
            end_at: null
        }
    }

    start_at = moment(start_at).unix();
    let end_at = start_at + duration;

    return {
        start_at: start_at,
        end_at: end_at
    }
};

export const search = (
    tripData = {
        from: { coordinate: { lng: 0, lat: 0 } },
        to: { coordinate: { lng: 0, lat: 0 } },
        start_at: 0
    }, page = 1, sort = 'price', order = 'asc', limit = 10
) => {
    return makeRequest('get', '/api/v1/trips/search', {
        params: {
            fc: tripData.from.coordinate.lng + '|' + tripData.from.coordinate.lat,
            tc: tripData.to.coordinate.lng + '|' + tripData.to.coordinate.lat,
            start: tripData.start_at,
            sort,
            order,
            page,
            limit
        }
    })
};