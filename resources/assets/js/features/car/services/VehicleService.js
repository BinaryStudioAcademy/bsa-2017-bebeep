import { simpleRequest } from 'app/services/RequestService';

export const VehicleService = {
    getBrandOptions(name) {
        return simpleRequest.get(`/api/v1/car-brand`, {
            params: {
                search: name
            }
        })
            .then((response) => {
                return response.data.data;
            }).then((json) => {
                return { options: json };
            });
    },

    getModelOptions(id, name) {
        return simpleRequest.get(`/api/v1/car-brand/${id}/models`, {
            params: {
                search: name
            }
        })
            .then((response) => {
                return response.data.data;
            }).then((json) => {
                return { options: json };
            });
    },

    getColorOptions() {
        return simpleRequest.get(`/api/v1/car-color`)
            .then((response) => {
                return response.data;
            }).then((json) => {
                return { options: json };
            });
    },

    getBodyOptions() {
        return simpleRequest.get(`/api/v1/car-body`)
            .then((response) => {
                return response.data;
            }).then((json) => {
                return { options: json };
            });
    }
};
