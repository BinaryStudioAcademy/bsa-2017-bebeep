import * as actions from './actionTypes';

const initialState = {
    register: {
        success: false,
        errors: {}
    },
    verify: {
        success: false,
        errors: {},
    },
    profile: {
        data: {},
        errors: {}
    },
    password_change: {
        errors: {}
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

        case actions.USER_PROFILE_GET_SUCCESS:
        case actions.USER_PROFILE_EDIT_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    data: action.data,
                    errors: {}
                }
            };

        case actions.USER_PROFILE_EDIT_FAILED:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    errors: action.data,
                }
            };

        case actions.USER_PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                password_change: {
                    errors: {}
                }
            };

        case actions.USER_PASSWORD_CHANGE_FAILED:
            return {
                ...state,
                password_change: {
                    errors: action.data
                }
            };

        default:
            return state;
    }
};
