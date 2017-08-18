import * as actions from './actionTypes';

export const tripsLoadSuccess = payload => ({
    type: actions.TRIPS_LOAD_SUCCESS,
    payload
});

export const tripsFilterChanged = payload => ({
    type: actions.TRIPS_FILTER_CHANGED,
    payload
});