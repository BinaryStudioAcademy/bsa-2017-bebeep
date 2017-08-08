import * as actions from './actionTypes';

const initialState = {
    filterValue: '',
    vehicles: [],
    vehicle: {},
};

export default function (state = initialState, action) {
    switch(action.type) {

        case actions.GET_VEHICLES: {
            return {
                ...state,
                vehicles: action.vehicles
            };
        }

        case actions.GET_VEHICLE: {
            return {
                ...state,
                vehicle: action.vehicle
            };
        }

        /*case actions.ADD_VEHICLE: {
            return {
                ...state,
                users: [...state.users, action.user]
            };
        }

        case actions.DELETE_VEHICLE: {
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.id)
            };
        }

        case actions.CHANGE_FILTER_VALUE: {
            return {
                ...state,
                filterValue: action.filterValue.toLowerCase().trim()
            };
        }*/

        default: {
            return state;
        }
    }
};
