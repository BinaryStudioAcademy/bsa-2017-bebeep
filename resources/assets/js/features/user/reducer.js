import * as actions from './actionTypes';
import { browserHistory } from 'react-router';

const initialState = {
    register: {
        success: false,
        errors: {}
    },
    verify: {
        success: false,
        errors: {},
    },
    login: {
        success: false,
        failedNoUser: false,
        failedNoActivation: false,
        errors: {}
    },
    session: !!sessionStorage.jwt
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
        case actions.LOGIN_SUCCESS:
            browserHistory.push('/dashboard')
            return !!sessionStorage.jwt
        // case actions.LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         login: {
        //             success: true,
        //             failedNoUser: false,
        //             failedNoActivation: false,
        //             errors: {}
        //         }
        //     };
        // case actions.LOGIN_FAILED_NOUSER:
        //     return {
        //         ...state,
        //         login: {
        //             ...state.login,
        //             errors: action.data,
        //             failedNoUser: true,
        //             failedNoActivation: false,
        //             success: false
        //         }
        //     };

        // case actions.LOGIN_FAILED_NOACTIVATION:
        //     return {
        //         ...state,
        //         login: {
        //             ...state.login,
        //             errors: action.data,
        //             failedNoUser: false,
        //             failedNoActivation: true,
        //             success: false
        //         }
        //     };

        default: {
            return state;
        }
    }
};
