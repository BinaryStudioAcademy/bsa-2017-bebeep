import * as actions from './actionTypes';

const initialState = {
    register: {
        errors: {}
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    errors: {}
                }
            };
        case actions.REGISTER_FAILED:
            return {
                ...state,
                register: {
                    errors: action.data
                }
            };
        default: {
            return state;
        }
    }
};
