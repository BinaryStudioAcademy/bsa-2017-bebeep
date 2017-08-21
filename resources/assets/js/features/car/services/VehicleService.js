import { simpleRequest, securedRequest } from '../../../app/services/RequestService';

export const VehicleService = {
    getVehicles() {
        return securedRequest.get('/api/v1/car')
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );
    },

    getBrandOptions() {
        return securedRequest.get(`/api/v1/car-brand`)
            .then((response) => {
                return response.data;
            }).then((json) => {
                return { options: json };
            });
    },

    getModelOptions() {
        return securedRequest.get(`/api/v1/car-brand/1/models`)
            .then((response) => {
                return response.data;
            }).then((json) => {
                return { options: json };
            });
    },

    getColorOptions() {
        return securedRequest.get(`/api/v1/car-color`)
            .then((response) => {
                return response.data;
            }).then((json) => {
                return { options: json };
            });
    },

    getBodyOptions() {
        return securedRequest.get(`/api/v1/car-body`)
            .then((response) => {
                return response.data;
            }).then((json) => {
                return { options: json };
            });
    }
};