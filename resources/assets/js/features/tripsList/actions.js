import axios from 'axios'
import * as actions from './actionTypes';

const url = '/api/v1/trips/';

export function filterPast() {
    return dispatch => {
        axios.get(url+'?filter=past')
            .then(response => {
                dispatch({
                    type: actions.TRIPSLIST_FILTER_PAST,
                    filtered: response.data
                })
            })
            .catch(error => {
            });
    };
}

export function filterUpcoming() {
    return dispatch => {
        axios.get(url+'?filter=upcoming')
            .then(response => {
                dispatch({
                    type: actions.TRIPSLIST_FILTER_UPCOMING,
                    filtered: response.data
                })
            })
            .catch(error => {
            });
    };
}

export function showModal(modalData) {
    return{
        type: actions.TRIPSLIST_SHOW_MODAL,
        modalData:modalData
    };
}

export function hideModal() {
    return{
        type: actions.TRIPSLIST_HIDE_MODAL
    };
}