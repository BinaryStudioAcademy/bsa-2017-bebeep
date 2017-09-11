import validate from 'validate.js';

export default class Validator
{
    static validate(rules, data) {
        let result = {
            valid: true,
            errors: {}
        };

        for (let field of Object.keys(rules)) {
            let ruleFunctions = Array.isArray(rules[field]) ? rules[field] : [rules[field]];

            ruleFunctions.forEach((func) => {
                let error = func(data[field]);

                if (error && result.errors[field]) {
                    return true;
                }

                if (error) {
                    result.valid = false;
                    result.errors[field] = error;
                }
            });
        }

        return result;
    }

    static required(errorMessage) {
        return (value) => {
            return validate.isEmpty(value) ? errorMessage : false;
        }
    }

    static greaterThan(parameter, errorMessage) {
        return (value) => {
            if (validate.isEmpty(value)) {
                return errorMessage;
            }

            return value < parameter ? errorMessage : false;
        }
    }

    static greaterThanOrEqual(parameter, errorMessage) {
        return (value) => {
            if (validate.isEmpty(value)) {
                return errorMessage;
            }

            return value <= parameter ? errorMessage : false;
        }
    }

    static coordinate(errorMessage) {
        return (value) => {
            const coord = Object.assign({lng: null, lat: null}, value);
            if (validate.isEmpty(coord.lat) || validate.isEmpty(coord.lng)) {
                return errorMessage;
            }
            return null;
        }
    }
}