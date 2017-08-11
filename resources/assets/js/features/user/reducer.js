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
    password: {
        forgot: {
            success: false,
            errors: {}
        },
        reset: {
            success: false,
            errors: {}
        }
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
        case actions.USER_PASSWORD_FORGOT_SUCCESS:
            return {
                ...state,
                password: {
                    ...state.password,
                    forgot: {
                        ...state.password.forgot,
                        success: true,
                        errors: {}
                    }
                }
            };
        case actions.USER_PASSWORD_FORGOT_FAILED:
            return {
                ...state,
                password: {
                    ...state.password,
                    forgot: {
                        ...state.password.forgot,
                        success: false,
                        errors: action.error
                    }
                }
            };
        case actions.USER_PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                password: {
                    ...state.password,
                    reset: {
                        ...state.password.reset,
                        success: true,
                        errors: {}
                    }
                }
            };
        case actions.USER_PASSWORD_RESET_FAILED:
            return {
                ...state,
                password: {
                    ...state.password,
                    reset: {
                        ...state.password.reset,
                        success: false,
                        errors: action.error
                    }
                }
            };
        default: {
            return state;
        }
    }
};
