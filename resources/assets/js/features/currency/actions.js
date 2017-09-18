import * as actions from './actionTypes';

export const setCurrencies = payload => ({
    type: actions.SET_CURRENCIES,
    payload
});

export const setActiveCurrence = payload => ({
    type: actions.SET_ACTIVE_CURRENCE,
    payload
});
