import * as actions from './actionTypes';
import { browserHistory } from 'react-router';

const initialState = {
    from: {
        name: '',
        coordinate: {lat: null, lng: null,}
    },
    to: {
        name: '',
        coordinate: {lat: null, lng: null,}
    },
    start_at: null,
    filter: {
        time: [0, 24],
        price: [0, 0]
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.SEARCH_INDEX_SUCCESS:
            browserHistory.push('/search');
        case actions.SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                from: {
                    name: action.data.from.name,
                    coordinate: action.data.from.coordinate
                },
                to: {
                    name: action.data.to.name,
                    coordinate: action.data.to.coordinate
                },
                start_at: action.data.start_at,

            };
        case actions.SEARCH_FILTER:
            return {
                ...state,
                start_at: action.data.date,
                filter: {
                    ...state.filter,
                    time: action.data.time,
                    price: action.data.price
                }
            };
        default:
            return state;
    }

}