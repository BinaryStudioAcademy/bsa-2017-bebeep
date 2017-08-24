import * as actions from './actionTypes';

export const bookingsGetSuccess = data => ({
    type: actions.BOOKINGS_GET_SUCCESS,
    data
});