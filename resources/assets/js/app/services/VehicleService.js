import validate from 'validate.js';
import {simpleRequest} from './RequestService';

export const VehicleConstraints = {
    brand: {
        presence: true
    },

    model: {
        presence: true
    },

    color: {
        presence: true
    },

    body: {
        presence: true
    },

    year: {
        presence: true,
        numericality: {
            strict: true,
            onlyInteger: true,
            greaterThanOrEqualTo: 1980,
            lessThanOrEqualTo: new Date().getFullYear(),
        },
    },

    seats: {
        presence: true,
        numericality: {
            strict: true,
            onlyInteger: true,
            greaterThan: 0,
        }
    },

    photo: {
        /*presence: true
        url: true,*/
    }
};

export const VehicleValidator = {
    brand: (data) => {
        const result = validate.single(data, VehicleConstraints.brand);
        let error = result ? result.join(", ") : "";
        return {
            valid: !result,
            error
        };
    },

    model: (data) => {
        const result = validate.single(data, VehicleConstraints.model);
        let error = result ? result.join(", ") : "";
        return {
            valid: !result,
            error
        };
    },

    color: (data) => {
        const result = validate.single(data, VehicleConstraints.color);
        let error = result ? result.join(", ") : "";
        return {
            valid: !result,
            error
        };
    },

    body: (data) => {
        const result = validate.single(data, VehicleConstraints.body);
        let error = result ? result.join(", ") : "";
        return {
            valid: !result,
            error
        };
    },

    year: (data) => {
        const result = validate.single(data, VehicleConstraints.year);
        let error = result ? result.join(", ") : "";
        return {
            valid: !result,
            error
        };
    },

    seats: (data) => {
        const result = validate.single(data, VehicleConstraints.seats);
        let error = result ? result.join(", ") : "";
        return {
            valid: !result,
            error
        };
    },

    photo: (data) => {
        const result = validate.single(data, VehicleConstraints.photo);
        let error = result ? result.join(", ") : "";
        return {
            valid: !result,
            error
        };
    },
};

export const VehicleValidate = (data = {
    brand: "",
    model: "",
    color: "",
    body: "",
    year: "",
    seats: "",
    photo: "",
}) => {

    let result = {
        valid: true,
        errors: {}
    };

    let storeResult = (result, valid, field) => {
        result.valid = result.valid && valid.valid;
        if (!result.valid) {
            result.errors[field] = valid.error;
        }
        return result;
    };

    for (let field of Object.keys(data)) {
        storeResult(result, VehicleValidator[field](data[field]), field);
    }

    return result;
};

export const VehicleData = {
    fetchBrand(name) {
        return simpleRequest.get(`/api/v1/car-brand/`, {
            params: {
                search: name,
                orderBy: 'name'
            }
        });
    },

    fetchModel(name, brandId) {
        if (brandId > 0) {
            return simpleRequest.get(`/api/v1/car-brand/${brandId}/models`, {
                params: {
                    search: name,
                    orderBy: 'name'
                }
            });
        } else {
            return Promise.resolve({ data: { data: [] } });
        }
    }
};

const VehicleService = {
    VehicleConstraints,
    VehicleValidator,
    VehicleValidate,
    VehicleData,
};

export default VehicleService;