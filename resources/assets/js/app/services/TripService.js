import Validator from './Validator';
import moment from 'moment';

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
