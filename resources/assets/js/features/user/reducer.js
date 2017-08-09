import * as actions from './actionTypes';

const initialState = {
    register: {
        success: false,
        errors: {},
        verify: {
            success: false,
            errors: {},
        }
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    success: true,
                    errors: {}
                }
            };
        case actions.REGISTER_FAILED:
            return {
                ...state,
                register: {
                    ...state.register,
                    errors: action.data
                }
            };

        case actions.REGISTER_VERIFY_FAILED:
            return {
                ...state,
                register: {
                    ...state.register,
                    verify: {
                        ...state.register.verify,
                        errors: action.data
                    }
                }
            };
        case actions.REGISTER_VERIFY_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    verify: {
                        ...state.register.verify,
                        success: true
                    }
                }
            };
        default: {
            return state;
        }
    }
};
