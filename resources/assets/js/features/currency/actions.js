import * as actions from './actionTypes';
import { simpleRequest } from 'app/services/RequestService';

export const setCurrencies = payload => ({
    type: actions.SET_CURRENCIES,
    payload,
});

export const setActiveCurrency = payload => ({
    type: actions.SET_ACTIVE_CURRENCY,
    payload,
});

export const getCurrencies = () => dispatch => {
    return new Promise((success, reject) => {
        simpleRequest.get('/api/v1/currencies')
            .then(response => {
                dispatch(setCurrencies(response.data));
                success();
            })
            .catch(error => {
                if (typeof error !== 'function') {
                    return;
                }
                reject();
            });
    });
};
