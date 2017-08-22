import * as actions from './actionTypes';

export const vehicleCreateSuccess = data => ({
    type: actions.VEHICLE_CREATE_SUCCESS,
    data
});