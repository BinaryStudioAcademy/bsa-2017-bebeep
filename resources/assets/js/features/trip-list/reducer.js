import * as actions from './actionTypes';

const initialState = {
    list: [],
    trips: {},
    vehicle: {},
    routes: {},
    bookings: {},
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
            return Object.assign(state, action.data);
        case actions.TRIPS_BOOKING_STATUS_CHANGE:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    [action.id]: action.booking
                }
            };
        default: {
            return state;
        }
    }
};