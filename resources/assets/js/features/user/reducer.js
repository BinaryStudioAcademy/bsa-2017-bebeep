import * as actions from './actionTypes';

const initialState = {
    user: {},
};

export default function (state = initialState, action) {
    switch(action.type) {

/*
USER_PROFILE_EDIT
USER_PASSWORD_CHANGE
USER_AVATAR_CHANGE
 */
        case actions.USER_PROFILE_EDIT: {
            return {
                ...state,
                user: action.user
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
