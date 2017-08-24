import * as actions from './actionTypes';

const initialState = {
    vehicles: [],
    brand: {
        id_car_mark: null,
        name: null
    },
    model: {
        id_car_model: null,
        id_car_mark: null,
        name: null,
        disabled: true
    },
    color: {
        id: null,
        color: null
    },
    body: {
        id: null,
        body: null
    },
    seats: null,
    year: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.VEHICLE_GET_ALL_SUCCESS: {
            return {
                ...state,
                vehicles: action.vehicles
            };
        }

        case actions.VEHICLE_DELETE_SUCCESS: {
            const vehicleId = parseInt(action.data.vehicleId);
            return {
                ...state,
                vehicles: state.vehicles.filter((vehicle) => vehicle.id !== vehicleId)
            }
        }

        case actions.VEHICLE_CREATE_SUCCESS: {
            return {
                ...state,
                brand: {
                    id_car_mark: null,
                    name: null
                },
                model: {
                    id_car_model: null,
                    id_car_mark: null,
                    name: null,
                    disabled: true
                },
                color: {
                    id: null,
                    color: null
                },
                body: {
                    id: null,
                    body: null
                },
                seats: null,
                year: null
            };
        }

        default: {
            return state;
        }
    }
};
