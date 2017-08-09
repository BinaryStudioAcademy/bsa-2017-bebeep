import * as actions from './actionTypes';

const initialState = {
    trips: []
};


export default function (state = initialState, action) {
    switch(action.type) {
        case actions.TRIPSLIST_GET_ALL: {
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
