import * as actions from './actionTypes';
import { securedRequest } from 'app/services/RequestService';

export const setCurrencies = payload => ({
    type: actions.SET_CURRENCIES,
    payload,
});

export const setActiveCurrency = payload => ({
    type: actions.SET_ACTIVE_CURRENCY,
    payload,
});

export const getCurrencies = () => dispatch => {
    return new Promise((success, error) => {
        securedRequest.get('/api/v1/currencies')
            .then(response => {
                dispatch(setCurrencies(response.data));
                success();
            })
            .catch(error => {
                if (typeof error !== 'function') {
                    return;
                }
                error();
            });
    });
};
