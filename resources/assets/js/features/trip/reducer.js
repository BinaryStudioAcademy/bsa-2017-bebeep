import * as actions from './actionTypes';

const initialState = {
    create: {
        trip: null,
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.TRIP_CREATE_SUCCESS:
            return {
                ...state,
                create: {
                    trip: action.data,
                }
            };
        default: {
            return state;
        }
    }
};