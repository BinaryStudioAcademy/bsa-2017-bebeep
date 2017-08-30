import * as actions from './actionTypes';
import { isAuthorized } from 'app/services/AuthService';

const initialState = {
    register: {
        success: false,
    },
    login: {
        success: isAuthorized(),
        errors: {},
        httpStatus: 200
    },
    profile: {
        first_name: 'Diana',
        last_name: 'Kub',
        avatar: null,
    },
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
            return {
                ...state,
                login: {
                    ...state.login,
                    success: isAuthorized(),
                    httpStatus: 200
                },
                profile: action.data.user,
            };
        case actions.LOGIN_VERIFY_FAILED:
            return {
                ...state,
                login: {
                    ...state.login,
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
                    ...state.login,
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
                    ...state.login,
                    success: isAuthorized(),
                    errors: action.response.data,
                    httpStatus: action.response.status,
                }
            };

        case actions.USER_PROFILE_SET_STATE:
        case actions.USER_PROFILE_UPDATE_STATE:
            return {
                ...state,
                profile: action.data,
            };

        case actions.USER_AVATAR_UPDATE_STATE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    avatar: action.data,
                }
            };

        default:
            return state;
    }
};
