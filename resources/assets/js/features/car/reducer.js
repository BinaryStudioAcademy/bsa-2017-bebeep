import * as actions from './actionTypes';

const initialState = {
    vehicles: [],
    vehicle: {},
    create: {
        errors: {}
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.VEHICLE_GET_ALL_SUCCESS: {
            return {
                ...state,
                vehicles: action.vehicles
            };
        }

        case actions.VEHICLE_GET_SUCCESS: {
            return {
                ...state,
                vehicle: action.vehicle
            };
        }

        case actions.VEHICLE_CREATE_SUCCESS: {
            return {
                ...state,
                vehicle: {
                    create: {
                        success: true
                    }
                },
                users: [...state.users, action.user]
            };
        }

        default: {
            return state;
        }
    }
};
