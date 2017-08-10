import * as actions from './actionTypes';

const initialState = {
    register: {
        validate: false,
        success: false,
        errors: {},
        user: {}
    },
    verify: {
        success: false,
        errors: {},
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.USER_REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    success: true,
                    errors: {}
                }
            };
        case actions.USER_REGISTER_FAILED:
            return {
                ...state,
                register: {
                    ...state.register,
                    errors: action.data,
                    success: false
                }
            };
        case actions.USER_REGISTER_VALIDATE:
            return {
                ...state,
                register: {
                    ...state.register,
                    success: false,
                    errors: action.errors,
                    validate: action.validate,
                    user: action.data
                }
            };
        case actions.USER_VERIFY_FAILED:
            return {
                ...state,
                verify: {
                    ...state.verify,
                    errors: action.data,
                    success: false
                }
            };
        case actions.USER_VERIFY_SUCCESS:
            return {
                ...state,
                verify: {
                    ...state.verify,
                    success: true,
                    errors: {}
                }
            };
        default: {
            return state;
        }
    }
};
