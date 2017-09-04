import * as actions from './actionTypes';

const initialState = {
    notifications: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.NOTIFICATION_SET_LIST:
            return {
                ...state,
                notifications: action.notifications.data
            };
        default:
            return state;
    }
};
