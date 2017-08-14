import { makeRequest } from '../../app/services/RequestService';
import * as actions from './actionTypes';

const url = '/api/v1/trips';

export function fetchPast() {
    return dispatch => {
        makeRequest('get', url + '?filter=past')
            .then(response => {
            dispatch({
                type: actions.TRIPSLIST_FETCH_PAST,
                trips: response.data
            })
        }).catch(error => {
            }
        );
    };
}

export function fetchUpcoming() {
    return dispatch => {
        makeRequest('get', url + '?filter=upcoming').then(response => {
            dispatch({
                type: actions.TRIPSLIST_FETCH_UPCOMING,
                trips: response.data
            })
        }).catch(error => {
                }
        );
    };
}
