import * as actions from './actionTypes';
import { securedRequest } from 'app/services/RequestService';

export const getBrandsData = data => ({
    type: actions.GET_BRANDS_DATA,
    data
});

export const getModelsData = data => ({
    type: actions.GET_MODELS_DATA,
    data
});

export const resetModelsData = () => ({
    type: actions.RESET_MODELS_DATA
});

export const getColorsData = data => ({
    type: actions.GET_COLORS_DATA,
    data
});

export const getBodyData = data => ({
    type: actions.GET_BODY_DATA,
    data
});

export const getAllSuccess = vehicles => ({
    type: actions.VEHICLE_GET_ALL_SUCCESS,
    vehicles
});

export const vehicleDeleteSuccess = data => ({
    type: actions.VEHICLE_DELETE_SUCCESS,
    data
});

export const vehicleCreateSuccess = data => ({
    type: actions.VEHICLE_CREATE_SUCCESS,
    data
});

export const getVehiclesData = () => dispatch => {
    securedRequest.get('/api/v1/car-brand/').then(response => {
        dispatch(getBrandsData(response.data.data));
    }).catch(error => {});

    securedRequest.get('/api/v1/car-color/').then(response => {
        dispatch(getColorsData(response.data));
    }).catch(error => {});

    securedRequest.get('/api/v1/car-body/').then(response => {
        dispatch(getBodyData(response.data));
    }).catch(error => {});
};

export const getBrandModelsData = (id) => dispatch => {
    securedRequest.get(`/api/v1/car-brand/${id}/models`).then(response => {
        dispatch(getModelsData(response.data.data));
    }).catch(error => {});
};

export const getVehicles = () => dispatch => {
    securedRequest.get('/api/v1/car')
        .then(response => {
            dispatch(getAllSuccess(response.data));
        })
        .catch(error => {});
};

export const deleteVehicle = (id) => dispatch => {
    securedRequest.delete('/api/v1/car/' + id)
        .then(response => {
            dispatch(vehicleDeleteSuccess({ vehicleId: id }));
        })
        .catch(error => {});
};
