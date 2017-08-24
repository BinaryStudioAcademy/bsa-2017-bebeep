import * as actions from './actionTypes';
import { securedRequest } from '../../app/services/RequestService';

export function getVehicles() {
    return dispatch => {
        securedRequest.get('/api/v1/car')
            .then(response => dispatch(getAllSuccess(response.data)))
        ;
    };
};

export const getAllSuccess = vehicles => ({
    type: actions.VEHICLE_GET_ALL_SUCCESS,
    vehicles
});

export const vehicleCreateSuccess = data => ({
    type: actions.VEHICLE_CREATE_SUCCESS,
    data
});