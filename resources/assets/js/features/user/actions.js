import * as actions from './actionTypes';
import axios from 'axios';

export const loginFailed = data => ({
    type: data.code == 404 ? actions.LOGIN_FAILED_NOUSER : actions.LOGIN_FAILED_NOACTIVATION,
    data
});

export const loginSuccess = data => ({
    type: actions.LOGIN_SUCCESS,
    data
});


export const doLogin = (data) => {
    return dispatch => {
        axios.post('/api/user/authenticate', data)
            .then(response => dispatch(loginSuccess(response.data)))
            .catch(error => dispatch(loginFailed(error.response.data)))
        ;
    }
}
