import validate from 'validate.js';
import {simpleRequest} from './RequestService';
import LangService from './LangService';

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
        let error = result ? LangService.translate("validate.car_brand_is_required") : "";
        return {
            valid: !result,
            error
        };
    },

    model: (data) => {
        const result = validate.single(data, VehicleConstraints.model);
        let error = result ? LangService.translate("validate.car_model_is_required") : "";
        return {
            valid: !result,
            error
        };
    },

    color: (data) => {
        const result = validate.single(data, VehicleConstraints.color);
        let error = result ? LangService.translate("validate.car_color_is_required") : "";
        return {
            valid: !result,
            error
        };
    },

    body: (data) => {
        const result = validate.single(data, VehicleConstraints.body);
        let error = result ? LangService.translate("validate.car_body_is_required") : "";
        return {
            valid: !result,
            error
        };
    },

    year: (data) => {
        const result = validate.single(data, {
            presence: {message: LangService.translate("validate.car_year_is_required")},
            numericality: {message: LangService.translate("validate.car_year_must_be_less_than_or_equal_to_current_year")},
        });

        let error = result ? result.join(". ") : "";

        return {
            valid: !result,
            error
        };
    },

    seats: (data) => {
        const result = validate.single(data, {
            presence: {message: LangService.translate("validate.car_seats_is_required")},
            numericality: {message: LangService.translate("validate.car_seats_must_be_a_valid_number")},
        });

        let error = result ? result.join(". ") : "";

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
    getBrands(name) {
        return simpleRequest.get(`/api/v1/car-brand/`, {
            params: {
                search: name,
                orderBy: 'name'
            }
        });
    },

    getModels(name, brandId) {
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