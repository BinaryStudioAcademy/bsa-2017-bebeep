import * as actions from './actionTypes';

const initialState = {
    currencies: [],
    activeCurrency: {},
};

export default function (state = initialState, action) {
    switch(action.type) {

        case actions.SET_CURRENCIES:
            return {
                ...state,
                currencies: action.payload,
            };

        case actions.SET_ACTIVE_CURRENCY:
            return {
                ...state,
                activeCurrency: action.payload,
            };

        default:
            return state;
    }
}
