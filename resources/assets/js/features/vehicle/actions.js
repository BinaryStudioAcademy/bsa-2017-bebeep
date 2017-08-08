import * as actions from './actionTypes';

const vehiclesData = [
    {id: 1, name: 'BMW 007', type: 'Car 1'},
    {id: 2, name: 'Ferrari 012', type: 'Car 2'},
    {id: 3, name: 'Mercedes Benz g63', type: 'Car 3'}
];

export function getVehicles() {
    return {
        type: actions.GET_VEHICLES,
        vehicles: vehiclesData,
    };
}

export function getVehicle(id) {
    id = parseInt(id, 10);

    return {
        type: actions.GET_VEHICLE,
        vehicle: vehiclesData.filter((vehicle) => vehicle.id === id)[0],
    };
}

/*export function getVehicle(id) {
    // return type: actions.GET_VEHICLE
}

export function addVehicle(vehicle) {
    // return type: actions.ADD_VEHICLE
}

export function deleteVehicle(id) {
    // return type: actions.DELETE_VEHICLE
}

export function changeFilterValue(filterValue) {
    // return type: actions.CHANGE_FILTER_VALUE
};*/
