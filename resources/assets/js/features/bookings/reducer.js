import * as actions from './actionTypes';

const initialState = {
    data: [],
    meta: {
        total: 0,
        page: 1
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.BOOKINGS_GET_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                meta: action.data.meta
            };
        default:
            return state;
    }
};
