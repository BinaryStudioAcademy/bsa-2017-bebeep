import * as actions from './actionTypes';

const initialState = {
    vehicles: [],
    vehicle: {},
};

export default function (state = initialState, action) {
    switch(action.type) {

        case actions.VEHICLE_GET_ALL: {
            return {
                ...state,
                vehicles: action.vehicles
            };
        }

        case actions.VEHICLE_GET: {
            return {
                ...state,
                vehicle: action.vehicle
            };
        }

        /*case actions.VEHICLE_ADD: {
            return {
                ...state,
                users: [...state.users, action.user]
            };
        }

        case actions.VEHICLE_EDIT: {
            return {
                ...state,
                vehicle: action.vehicle
            };
        }

        case actions.VEHICLE_DELETE: {
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.id)
            };
        }*/

        default: {
            return state;
        }
    }
};
