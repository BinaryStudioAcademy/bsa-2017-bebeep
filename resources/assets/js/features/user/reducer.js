import * as actions from './actionTypes';

const initialState = {
    register: {
        success: false,
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.USER_REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    success: true,
                }
            };
        default: {
            return state;
        }
    }
};
