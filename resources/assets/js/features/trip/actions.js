import * as actions from './actionTypes';

export const tripCreateSuccess = data => ({
    type: actions.TRIP_CREATE_SUCCESS,
    data
});

export const tripDetailsSetState = payload => {
    return {
        type: actions.TRIP_DETAILS_SET_STATE,
        payload
    }
};

export const addBookingState = isBooked => {
    return {
        type: actions.TRIP_DETAILS_ADD_BOOKING,
        isBooked
    }
};
