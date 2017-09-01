import * as actions from './actionTypes';
import { securedRequest } from 'app/services/RequestService';

export const publicDriverProfileSetState = profile => ({
    type: actions.PUBLIC_DRIVER_PROFILE_SET_STATE,
    profile
});

export const publicPassengerProfileSetState = profile => ({
    type: actions.PUBLIC_PASSENGER_PROFILE_SET_STATE,
    profile
});

export const publicProfileSetRequestStatus = (status) => ({
    type: actions.PUBLIC_PROFILE_SET_REQUEST_STATUS,
    status
});

export const getPublicProfile = (id, type) => dispatch => {
    dispatch(publicProfileSetRequestStatus(false));

    if (type !== 'driver' && type !== 'passenger') {
        return null;
    }

    const actionSetState = type === 'driver' ?
        publicDriverProfileSetState :
        publicPassengerProfileSetState;

    return securedRequest.get(`/api/v1/${type}/${id}`)
        .then(response => {
            dispatch(actionSetState(response.data.data));
            dispatch(publicProfileSetRequestStatus(true));
        })
        .catch(error => {
            dispatch(publicProfileSetRequestStatus(false));
        });
};
