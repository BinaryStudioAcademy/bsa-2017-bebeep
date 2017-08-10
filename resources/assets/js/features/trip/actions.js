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
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJpYXQiOjE1MDIzNTc3NjMsImV4cCI6MTUwMjk2MjU2MywibmJmIjoxNTAyMzU3NzYzLCJqdGkiOiJVYXpNbHkyYVFIV2pPcnBjIn0._eSxtg_VASZu-vfji9TYzfMcFQ6AVm40MEZ0gA_8InU';
        axios.post('/api/trips/create', trip, {
            headers: { Authorization: "Bearer " + token }
        })
            .then(response => {
                console.log(response);
                dispatch(createTripSuccess(response.trip))
            })
            .catch(/*error => dispatch(createTripFailed(error.response.trip))*/);
    };
};

export default createTripDispatch;