import * as actions from './actionTypes';

const initialState = {
    details: {
        trip: null,
        routes: null,
        driver: null,
        vehicle: null,
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.TRIP_DETAILS_SET_STATE:
            return {
                ...state,
                details: {
                    trip: action.payload.trip,
                    routes: action.payload.routes.data,
                    driver: action.payload.driver.data,
                    vehicle: action.payload.vehicle.data,
                },
            };

        default:
            return state;
    }
};
