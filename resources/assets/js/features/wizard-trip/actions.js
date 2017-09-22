import * as actions from './actionTypes';

export const addLocation = (data) => ({
    type: actions.WIZARD_TRIP_LOCATION,
    data
});

export const addSeats = (data) => ({
    type: actions.WIZARD_TRIP_SEATS,
    data
});

export const addCar = (data) => ({
    type: actions.WIZARD_TRIP_CAR,
    data
});

export const completeTrip = () => ({
    type: actions.WIZARD_TRIP_COMPLETE,
});

export const moveToStep = (data) => ({
    type: actions.WIZARD_TRIP_MOVE_TO_STEP,
    data
});
