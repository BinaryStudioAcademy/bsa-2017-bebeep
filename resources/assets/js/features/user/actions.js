import * as actions from './actionTypes';

export const registerSuccess = data => ({
    type: actions.USER_REGISTER_SUCCESS,
    data
});
