import * as actions from './actionTypes';
import { securedRequest } from 'app/services/RequestService';

import PublicProfileService from './services/PublicProfileService';

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

export const getDriverProfile = (id) => dispatch => {
    dispatch(publicProfileSetRequestStatus(false));

    return securedRequest.get('/api/v1/driver/' + id)
        .then(response => {
            response = PublicProfileService.transformData(response.data.data);

            dispatch(publicDriverProfileSetState(response));
            dispatch(publicProfileSetRequestStatus(true));
        })
        .catch(error => {
            dispatch(publicProfileSetRequestStatus(false));
        });
};

export const getPassengerProfile = (id) => dispatch => {
    dispatch(publicProfileSetRequestStatus(false));

    return securedRequest.get('/api/v1/passenger/' + id)
        .then(response => {
            response = PublicProfileService.transformData(response.data.data);

            dispatch(publicPassengerProfileSetState(response));
            dispatch(publicProfileSetRequestStatus(true));
        })
        .catch(error => {
            dispatch(publicProfileSetRequestStatus(false));
        });
};
