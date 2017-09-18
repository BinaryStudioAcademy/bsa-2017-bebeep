import * as actions from './actionTypes';

const initialState = {
    currencies: [],
    activeCurrency: null,
};

export default function (state = initialState, action) {
    switch(action.type) {

        case actions.SET_CURRENCIES:
            return {
                currencies: action.payload.currencies,
                activeCurrency: action.payload.activeCurrency,
            };

        case actions.SET_ACTIVE_CURRENCE:
            return {
                ...state,
                activeCurrency: action.payload.activeCurrency,
            };

        default:
            return state;
    }
}
