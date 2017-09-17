import * as actions from './actionTypes';
import { securedRequest } from 'app/services/RequestService';

export const getAllSuccess = vehicles => ({
    type: actions.VEHICLE_GET_ALL_SUCCESS,
    vehicles
});

export const vehicleCreateSuccess = data => ({
    type: actions.VEHICLE_CREATE_SUCCESS,
    data
});

export const vehicleDeleteSuccess = data => ({
    type: actions.VEHICLE_DELETE_SUCCESS,
    data
});

//TODO: fix it
export const getVehiclesData = data => ({
    type: actions.GET_VEHICLES_DATA,
    data
});

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
