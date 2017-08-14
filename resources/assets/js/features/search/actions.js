import * as actions from './actionTypes';

const initialState = {
    from: {
        name: '',
        coordinate: {
            lat: 0,
            lng: 0
        }
    },
    to: {
        name: '' ,
        coordinate: {
            lat: 0,
            lng: 0
        }
    },
    start_at: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};