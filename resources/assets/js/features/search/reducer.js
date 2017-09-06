import * as actions from './actionTypes';

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
    filters: {
        price: [0, 2000],
        time: [0, 24],
        animals: null,
        luggage: null,
        seats: null,
        rating: null
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.SEARCH_INDEX_SUCCESS:
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
                start_at: action.data.start_at
            };
        case actions.SEARCH_FILTER_UPDATE:
            return {
                ...state,
                filters: action.filters
            };
        default:
            return state;
    }

}