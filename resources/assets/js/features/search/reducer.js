import * as actions from './actionTypes';

const initialState = {
    from: {
        name: '',
        coordinate: {lat: null, lng: null,},
        place: null
    },
    to: {
        name: '',
        coordinate: {lat: null, lng: null,},
        place: null
    },
    start_at: null,
    filters: {
        price: [0, 2000],
        time: [0, 24],
        animals: null,
        luggage: null,
        seats: null,
        rating: null,
        transfers:null,
    },
    subscription: null,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.SEARCH_INDEX_SUCCESS:
            return {
                ...state,
                from: {
                    name: action.data.from.name,
                    coordinate: action.data.from.coordinate,
                    place: action.data.from.place
                },
                to: {
                    name: action.data.to.name,
                    coordinate: action.data.to.coordinate,
                    place: action.data.to.place
                },
                start_at: action.data.start_at
            };
        case actions.SEARCH_PARAMS_UPDATE:
            return {
                ...state,
                from: Object.assign({}, state.from, action.from),
                to: Object.assign({}, state.to, action.to),
                start_at: action.start_at || state.start_at
            };
        case actions.SEARCH_FILTER_UPDATE:
            return {
                ...state,
                filters: action.filters
            };
        case actions.SEARCH_UPDATE_START_TIME:
            return {
                ...state,
                start_at: action.time
            };
        case actions.SUBSCRIPTION_UPDATE:
            return {
                ...state,
                subscription: {
                    email: action.data.email,
                    end_point: action.data.end_point,
                    filters: action.data.filters,
                    start_at: action.data.start_at,
                    start_point: action.data.start_point,
                    user_id: action.data.user_id
                }
            };
        case actions.SUBSCRIPTION_RESET:
            return {
                ...state,
                subscription: null
            };
        default:
            return state;
    }
}