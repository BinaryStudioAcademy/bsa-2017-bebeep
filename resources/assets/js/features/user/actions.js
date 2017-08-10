import * as actions from './actionTypes';
import axios from 'axios';

export const loginSuccess = data => ({
    type: actions.LOGIN_SUCCESS,
    data
});

export const loginFailedNoUser = data => ({
    type: actions.LOGIN_FAILED_NOUSER,
    data
});

export const loginFailedNoActivation = data => ({
    type: actions.LOGIN_FAILED_NOACTIVATION,
    data
});

//@TODO don't forget to catch noactivation case the right way
export const doLogin = (data) => {
    return dispatch => {
        axios.post('/api/user/authenticate', data)
            .then(response => dispatch(loginSuccess(response.data)))
            .catch(error => dispatch(loginFailedNoUser(error.response.data)))
        ;
    }
}

