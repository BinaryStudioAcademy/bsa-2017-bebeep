import * as actions from './actionTypes';
import { browserHistory } from 'react-router';

const initialState = {
    register: {
        success: false,
    },
    login: {
        success: !!sessionStorage.jwt,
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
        case actions.LOGIN_VERIFY_FAILED:
            return {
                ...state,
                login: {
                    success: false,
                    errors: action.data,
                }
            };
        case actions.LOGIN_FAILED_NO_ACTIVATION:
        case actions.LOGIN_FAILED_NO_USER:
        case actions.LOGIN_FAILED_BAD_CREDENTIALS:
        case actions.LOGIN_FAILED:
            return {
                ...state,
                login: {
                    success: false,
                    errors: action.response.data,
                    httpStatus: action.response.status,
                }
            };
        case actions.LOGOUT_SUCCESS:
        case actions.LOGOUT_FAILED:
            return {
                ...state,
                login: {
                    success: !!sessionStorage.jwt,
                    errors: action.response.data,
                    httpStatus: action.response.status,
                }
            };

        default: {
            return state;
        }
    }
};
