import * as actions from './actionTypes';

export const tripCreateSuccess = data => ({
    type: actions.TRIP_CREATE_SUCCESS,
    data
});