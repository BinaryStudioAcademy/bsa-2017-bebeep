import * as actions from './actionTypes';
import axios from 'axios';

const vehiclesData = [
    {id: 1, name: 'BMW 007', type: 'Car 1'},
    {id: 2, name: 'Ferrari 012', type: 'Car 2'},
    {id: 3, name: 'Mercedes Benz g63', type: 'Car 3'}
];

export function getVehicles() {
    return {
        type: actions.VEHICLE_GET_ALL,
        vehicles: vehiclesData,
    };
};

export function getVehicle(id) {
    id = parseInt(id, 10);

    return {
        type: actions.VEHICLE_GET,
        vehicle: vehiclesData.filter((vehicle) => vehicle.id === id)[0],
    };
};

export function addVehicle(vehicle) {
    return {
        type: actions.VEHICLE_ADD
    };
};

export const createSuccess = data => ({
    type: actions.CREATE_VEHICLE_SUCCESS,
    data
});

export const createFailed = data => ({
    type: actions.CREATE_VEHICLE_FAILED,
    data
});


export const doCreate = (data) => {
    return dispatch => {
        axios.post('/api/car/create', data)
        // axios.post('/api/car', data)
            .then(response => dispatch(createSuccess(response.data)))
            .catch(error => dispatch(createFailed(error.response.data)))
        ;
    };
};

/*
export function editVehicle(id) {
    // return type: actions.VEHICLE_EDIT
};

export function deleteVehicle(id) {
    // return type: actions.VEHICLE_DELETE
};
*/
