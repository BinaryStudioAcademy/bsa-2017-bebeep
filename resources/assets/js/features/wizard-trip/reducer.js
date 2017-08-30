import * as actions from './actionTypes';
import {INIT, STEP_ONE, STEP_TWO, STEP_THREE} from 'app/services/WizardTripService';

const initialState = {
    step: INIT,
    pendingTrip: {
        from: {},
        to: {},
        start_at: null,
        end_at: null,
        seats: 0,
        price: 0,
        brand: '',
        model: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.WIZARD_TRIP_LOCATION:
            return {
                ...state,
                step: STEP_ONE,
                pendingTrip: {
                    ...state.pendingTrip,
                    from: action.data.from,
                    to: action.data.to,
                    start_at: action.data.start_at,
                    end_at: action.data.end_at,
                }
            };
            break;
        case actions.WIZARD_TRIP_SEATS:
            return {
                ...state,
                step: STEP_TWO,
                pendingTrip: {
                    ...state.pendingTrip,
                    seats: action.data.seats,
                    price: action.data.price
                }
            };
            break;
        case actions.WIZARD_TRIP_CAR:
            return {
                ...state,
                step: STEP_THREE,
                pendingTrip: {
                    ...state.pendingTrip,
                    brand: action.data.brand,
                    model: action.data.model
                }
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
