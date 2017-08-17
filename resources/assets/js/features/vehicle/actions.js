import * as actions from './actionTypes';
import { securedRequest } from '../../app/services/RequestService';

// const vehiclesData = [
//     {id: 1, name: 'BMW 007', type: 'Car 1'},
//     {id: 2, name: 'Ferrari 012', type: 'Car 2'},
//     {id: 3, name: 'Mercedes Benz g63', type: 'Car 3'}
// ];


export function getVehicles() {
    return dispatch => {
        securedRequest.get('/api/v1/car')
            .then(response => dispatch(getAllSuccess(response.data)))
            .catch(error => dispatch(getAllFailed(error.response)))
        ;
    };

    // vehiclesData = securedRequest.get('/api/v1/car')
    //     .then(response => dispatch(getAllSuccess(response.data)))
    //     .catch(error => dispatch(getAllFailed(error.response.data)))
    // ;
};

export function getVehicle(id) {
    return dispatch => {
        securedRequest.get('/api/v1/car/' + id)
            .then(response => dispatch(getVehicleSuccess(response.data)))
            .catch(error => dispatch(getVehicleFailed(error.response)))
        ;
    };
    // id = parseInt(id, 10);

    // return {
    //     type: actions.VEHICLE_GET_SUCCESS,
    //     vehicle: vehiclesData.filter((vehicle) => vehicle.id === id)[0],
    // };
};



// export function getVehicle(id) {
//     id = parseInt(id, 10);

//     return {
//         type: actions.VEHICLE_GET,
//         vehicle: vehiclesData.filter((vehicle) => vehicle.id === id)[0],
//     };
// };

export function addVehicle(vehicle) {
    return {
        type: actions.VEHICLE_CREATE_SUCCESS
    };
};

export const getAllSuccess = vehicles => ({
    type: actions.VEHICLE_GET_ALL_SUCCESS,
    vehicles
});

export const getAllFailed = data => ({
    type: actions.VEHICLE_GET_ALL_FAILED,
    data
});

export const getVehicleSuccess = vehicle => ({
    type: actions.VEHICLE_GET_SUCCESS,
    vehicle
});

export const getVehicleFailed = vehicle => ({
    type: actions.VEHICLE_GET_FAILED,
    vehicle
});

export const createSuccess = data => ({
    type: actions.VEHICLE_CREATE_SUCCESS,
    data
});

export const createFailed = data => ({
    type: actions.VEHICLE_CREATE_FAILED,
    data
});

export const doCreate = (data) => {
    return dispatch => {
        securedRequest.post('/api/v1/car', data)
            .then(response => dispatch(createSuccess(response.data)))
            .catch(error => dispatch(createFailed(error.response)))
        ;
    };
};

export const editSuccess = data => ({
    type: actions.VEHICLE_EDIT_SUCCESS,
    data
});

export const editFailed = data => ({
    type: actions.VEHICLE_EDIT_FAILED,
    data
});

export const doEdit = (data) => {
    return dispatch => {
        securedRequest.put('/api/v1/car', data)
            .then(response => dispatch(editSuccess(response.data)))
            .catch(error => dispatch(editFailed(error.response)))
        ;
    };
};
/*
export function editVehicle(id) {
    // return type: actions.VEHICLE_EDIT_SUCCESS
};

export function deleteVehicle(id) {
    // return type: actions.VEHICLE_DELETE_SUCCESS
};
*/
