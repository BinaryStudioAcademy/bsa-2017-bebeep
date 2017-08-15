import * as actions from './actionTypes';
import { browserHistory } from 'react-router';

const initialState = {
    from: {
        name: '',
        coordinate: {lan: null, lng: null,}
    },
    to: {
        name: '',
        coordinate: {lan: null, lng: null,}
    },
    start_at: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.SEARCH_INDEX_SUCCESS:
            browserHistory.push('/search');
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
        default:
            return state;
    }

}