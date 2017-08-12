import * as actions from './actionTypes';
import axios from 'axios'

const url = '/api/v1/trips';

export function getTrips(){
    return dispatch => {
        axios.get(url)
            .then(response => {
                dispatch({
                    type: actions.TRIPSLIST_GET_ALL,
                    trips: response.data
                })
            })
            .catch(error => {
            });
    };
}

export function filterPast() {
    return {
        type: actions.TRIPSLIST_FILTER_PAST
    };
}

export function filterUpcoming() {
    return {
        type: actions.TRIPSLIST_FILTER_UPCOMING
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