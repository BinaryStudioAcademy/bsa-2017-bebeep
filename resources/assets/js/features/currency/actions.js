import * as actions from './actionTypes';

export const setCurrencies = payload => ({
    type: actions.SET_CURRENCIES,
    payload,
});

export const setActiveCurrency = payload => ({
    type: actions.SET_ACTIVE_CURRENCY,
    payload,
});
