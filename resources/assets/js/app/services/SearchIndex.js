import Validator from './Validator';

export const searchIndexRules = {
    from: Validator.required('Please select leaving from point'),
    to: Validator.required('Please select going to point'),
    start_at: Validator.required('Please select ride date')
};