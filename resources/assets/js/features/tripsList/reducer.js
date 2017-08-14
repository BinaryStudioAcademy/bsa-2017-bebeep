import * as actions from './actionTypes';

const initialState = {
    trips: [],
};


export default function (state = initialState, action) {
    switch(action.type) {
        case actions.TRIPSLIST_FETCH_PAST: {
            return {
                ...state,
                trips: action.trips
            };
        }

        case actions.TRIPSLIST_FETCH_UPCOMING: {
            return {
                ...state,
                trips: action.trips
            };
        }

        default: {
            return state;
        }
    }
};
