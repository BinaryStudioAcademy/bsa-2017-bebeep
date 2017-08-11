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
        success: !!sessionStorage.jwt,
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
        case actions.LOGIN_SUCCESS:
            browserHistory.push('/dashboard')
            return {
                ...state,
                login: {
                    success: !!sessionStorage.jwt
                }
            };
        case actions.LOGIN_FAILED:
            return {
                ...state,
                login: {
                    success: false,
                    errors: action.data
                }
            };

        default: {
            return state;
        }
    }
};
