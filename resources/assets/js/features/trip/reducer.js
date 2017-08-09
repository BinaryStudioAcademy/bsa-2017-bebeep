import * as actions from './actionTypes';

const initState = {
    create: {
        errors: {}
    },
    edit: {
        errors: {}
    }
};

export default function (state = initState, action) {
    switch(action.type) {
        case actions.TRIP_CREATE_SEND_SUCCESS:
            return {
                ...state,
                create: {
                    errors: {}
                }
            };
        case actions.TRIP_CREATE_SEND_FAILED:
            return {
                ...state,
                create: {
                    errors: action.trip
                }
            };
        default: {
            return state;
        }
    }
};