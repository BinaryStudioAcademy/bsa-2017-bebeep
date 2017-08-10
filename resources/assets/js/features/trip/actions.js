import axios from 'axios';
import * as actions from './actionTypes';
import { TripValidate } from '../../app/services/TripService';

export const createTripSuccess = (data) => ({
    type: actions.TRIP_CREATE_SEND_SUCCESS,
    data
});

export const createTripFailed = (data) => ({
    type: actions.TRIP_CREATE_SEND_FAILED,
    data
});

const createTripDispatch = (data, token) => {
    return dispatch => {
        const validated = TripValidate(data);
        if (validated.valid) {
            /*axios.post('/api/trips/create', data, {
                headers: { Authorization: "Bearer " + token }
            })
                .then(response => { dispatch(createTripSuccess(response.data))})
                .catch(error => dispatch(createTripFailed(error.response.data)));*/
        } else {
            dispatch(createTripFailed(validated.errors))
        }
    };
};

export default createTripDispatch;