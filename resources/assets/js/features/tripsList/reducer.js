import * as actions from './actionTypes';

const initialState = {
    trips: [],
    filtered: []
};


export default function (state = initialState, action) {
    switch(action.type) {
        case actions.TRIPSLIST_GET_ALL: {
            return {
                ...state,
                trips: action.trips
            };
        }
        case actions.TRIPSLIST_FILTER_PAST: {
            console.log(state);
            return {
            ...state,
            filtered: action.trips.filter(
                item => (new Date(item.start_at)<new Date()))

            };
        }

        case actions.TRIPSLIST_FILTER_UPCOMING: {
            console.log(state);
            return {
                ...state,
                filtered: action.trips.filter(
                    item => new Date(item.start_at)>new Date())

            };
        }
        default: {
            return state;
        }
    }
};
