import * as actions from './actionTypes';

export const setField = (field, value) => ({
    type: actions.REGISTER_SET_FIELD,
    field: field,
    value: value
});

export const registerSuccess = data => ({
    type: actions.REGISTER_SUCCESS,
    data
});

export const registerFailed = data => ({
    type: actions.REGISTER_FAILED,
    data
});

export const doRegister = (data) => {
    return dispatch => {
        return fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    return Promise.reject(response.json())
                }
            })
            .then(
                data => dispatch(registerSuccess(data)),
                failed => failed.then(data => dispatch(registerFailed(data)))
            );
    };
};
