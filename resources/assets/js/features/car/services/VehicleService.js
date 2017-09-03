import { simpleRequest } from 'app/services/RequestService';
import { VehicleData } from 'app/services/VehicleService'

export const VehicleService = {
    getBrandOptions(name) {
        return VehicleData.getBrands(name)
            .then((response) => {
                return response.data.data;
            }).then((json) => {
                return { options: json };
            });
    },

    getModelOptions(id, name) {
        return VehicleData.getModels(name, id)
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
