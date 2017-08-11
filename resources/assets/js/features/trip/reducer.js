import * as actions from './actionTypes';

const initState = {
    create: {
        errors: {},
        startPoint: {
            lat: '50.5084682',
            lng: '30.608410999999933'
        },
        endPoint: {
            lat: '50.5084512',
            lng: '30.607431700000006'
        },
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
                    errors: action.data
                }
            };
        case actions.TRIP_UPDATE_SEND_SUCCESS:
            return {
                ...state,
                create: {
                    errors: {}
                }
            };
        case actions.TRIP_UPDATE_SEND_FAILED:
            return {
                ...state,
                create: {
                    errors: action.data
                }
            };
        default: {
            return state;
        }
    }
};