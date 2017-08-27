import * as actions from './actionTypes';

const initialState = {
    current_driver_profile: {}
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.PUBLIC_PROFILE_SET_STATE:
            return {
                ...state,
                current_driver_profile: action.profile
            };
        default:
            return state;
    }

}