import * as actions from './actionTypes';

const initialState = {
    trips: [],
    filter: 'upcoming'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.TRIPS_FILTER_CHANGED:
            return {
                ...state,
                filter: action.payload
            };
        case actions.TRIPS_LOAD_SUCCESS:
            return {
                ...state,
                trips: action.payload
            };
        default: {
            return state;
        }
    }
};