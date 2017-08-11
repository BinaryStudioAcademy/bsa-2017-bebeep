import Validator from './Validator';

const createTripRules = {
    vehicle_id: Validator.required('Please select a car'),
    start_at: Validator.required('Please enter trip start time'),
    end_at: Validator.required('Please enter trip end time'),
    from: Validator.required('Enter trip start point'),
    to: Validator.required('Enter trip end point'),
    price: [Validator.required('Enter trip price'), Validator.greaterThan(1, 'Trip price must be greater than 0')],
    seats: [Validator.required('Enter trip seats'), Validator.greaterThan(1, 'Trip seats must be greater than 0')]
};

export const CreateTripValidate = (data) => {
    return Validator.validate(createTripRules, data);
};
