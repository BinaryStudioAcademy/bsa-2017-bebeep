import Validator from './Validator';

const createTripRules = {
    vehicle_id: Validator.required('Please select a car'),
    start_at: Validator.required('The trip should begin at least an hour later'),
    end_at: Validator.required('End trip time is required and should end at least an hour later start time'),
    from: Validator.required('Enter trip start point'),
    to: Validator.required('Enter trip end point'),
    price: [Validator.required('Enter trip price'), Validator.greaterThan(0, 'Trip price must be greater than 0')],
    seats: [Validator.required('Enter trip seats'), Validator.greaterThan(0, 'Trip seats must be greater than 0')]
};

export const CreateTripValidate = (data) => {
    return Validator.validate(createTripRules, data);
};
