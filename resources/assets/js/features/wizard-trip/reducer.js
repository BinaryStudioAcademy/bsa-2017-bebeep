import * as actions from './actionTypes';
import {INIT, STEP_ONE, STEP_TWO, STEP_THREE} from './services/WizardTripService';

const initialState = {
    step: INIT,
    from: {},
    to: {},
    start_at: null,
    seats: 0,
    price: 0,
    mark: '',
    model: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.WIZARD_TRIP_LOCATION:
            return {
                ...state,
                step: STEP_ONE,
                from: action.data.from,
                to: action.data.to,
                start_at: action.data.start_at,
            };
            break;
        case actions.WIZARD_TRIP_SEATS:
            return {
                ...state,
                step: STEP_TWO,
                seats: action.data.seats,
                price: action.data.price
            };
            break;
        case actions.WIZARD_TRIP_CAR:
            return {
                ...state,
                step: STEP_THREE,
                mark: action.data.mark,
                model: action.data.model
            };
            break;
        case actions.WIZARD_TRIP_COMPLETE:
            return {
                ...initialState
            };
        default:
            return state;
    }
};
