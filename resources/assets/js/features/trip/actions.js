import axios from 'axios';
import * as actions from './actionTypes';

export const createTripSuccess = (trip) => ({
    type: /*actions.TRIP_CREATE_SEND_SUCCESS*/ 'TRIP_CREATE_SEND_SUCCESS',
    trip
});

export const createTripFailed = (trip) => ({
    type: actions.TRIP_CREATE_SEND_FAILED,
    trip
});

const createTripDispatch = (trip) => {
    return dispatch => {
        axios.post('/api/trips/create', trip)
            .then(response => {
                console.log(response);
                dispatch(createTripSuccess(response.trip))
            })
            .catch(/*error => dispatch(createTripFailed(error.response.trip))*/);
    };
};

export default createTripDispatch;