import * as actions from './actionTypes';

import AuthService from 'app/services/AuthService';
import { UserValidator } from 'app/services/UserService';
import { simpleRequest, securedRequest } from 'app/services/RequestService';


export const setSessionData = data => ({
    type: actions.SET_SESSION_DATA,
    data
});

export const unsetSessionData = () => ({
    type: actions.UNSET_SESSION_DATA,
});

export const setSessionToken = data => ({
    type: actions.SET_SESSION_TOKEN,
    data
});

export const unsetSessionToken = () => ({
    type: actions.UNSET_SESSION_TOKEN,
});

export const registerSuccess = () => ({
    type: actions.USER_REGISTER_SUCCESS,
});

export const loginSuccess = () => ({
    type: actions.LOGIN_SUCCESS,
});

export const loginFormFailed = data => ({
    type: actions.LOGIN_VERIFY_FAILED,
    data
});

export const userProfileSetState = data => ({
    type: actions.USER_PROFILE_SET_STATE,
    data
});

export const userProfileUpdateState = data => ({
    type: actions.USER_PROFILE_UPDATE_STATE,
    data
});

export const userAvatarUpdateState = data => ({
    type: actions.USER_AVATAR_UPDATE_STATE,
    data
});

export const userBookingSetState = data => ({
    type: actions.USER_BOOKING_SET_STATE,
    data
});

export const userFormRoleSetState = data => ({
    type: actions.USER_ROLE_SET_STATE,
    data
});

export const userHaveBookingSetState = data => ({
    type: actions.USER_HAVE_BOOKING_SET_STATE,
    data
});

function processFailedLoginResponse(response) {
    switch (response.status) {
        case 401:
            return {
                type: actions.LOGIN_FAILED_NO_ACTIVATION,
                response
            };
        case 404:
            return {
                type: actions.LOGIN_FAILED_NO_USER,
                response
            };
        case 422:
            return {
                type: actions.LOGIN_FAILED_BAD_CREDENTIALS,
                response
            };
        default:
            return {
                type: actions.LOGIN_FAILED,
                response
            }
    }
}

export const doRegister = (data) => dispatch => {
    return simpleRequest.post('/api/user/register', data)
        .then(
            response => Promise.resolve(response.data),
            error => Promise.reject(error.response.data)
        );
};

export const doLogin = (credentials) => dispatch => {
    const emailValid = UserValidator.email(credentials.email);
    const passwordValid = UserValidator.password(credentials.password);

    if (!emailValid.valid) {
        return dispatch(loginFormFailed({ email: emailValid.error }));
    }

    if (!passwordValid.valid) {
        return dispatch(loginFormFailed({ password: passwordValid.error }));
    }

    simpleRequest.post('/api/user/authorization', {
        email: credentials.email,
        password: credentials.password
    })
        .then(response => {
            AuthService.initSession(response.data.token);
        })
        .catch(error => {
            dispatch(processFailedLoginResponse(error.response))
        });

};

export const logoutSuccess = () => ({
    type: actions.LOGOUT_SUCCESS,
});

export const logoutFailed = response => ({
    type: actions.LOGOUT_FAILED,
    response
});

export const doLogout = (data) => {
    const token = AuthService.getSessionToken();

    return dispatch => {
        securedRequest.post('/api/user/logout', { token })
            .then(response => {
                AuthService.destroySession();
            })
            .catch(error => {
                dispatch(logoutFailed(error.response));
            });
    };
};

export const setGivenReviews = (payload) => {
    const reviews = _.reduce(payload.data, (reviews, review) => {
        reviews['users'][review.user.data.id] = review.user.data;
        reviews['givenReviews'].push(review.id);
        reviews['reviews'][review.id] = {
            ...review,
            user: review.user.data.id
        };

        return reviews;
    }, {
        users: {},
        reviews: {},
        givenReviews: []
    });

    return {
        type: actions.USER_REVIEWS_SET_GIVEN,
        reviews
    }
};

export const setReceivedReviews = (payload) => {
    const reviews = _.reduce(payload.data, (reviews, review) => {
        reviews['users'][review.user.data.id] = review.user.data;
        reviews['receivedReviews'].push(review.id);
        reviews['reviews'][review.id] = {
            ...review,
            user: review.user.data.id
        };

        return reviews;
    }, {
        users: {},
        reviews: {},
        receivedReviews: []
    });

    return {
        type: actions.USER_REVIEWS_SET_RECEIVED,
        rating: payload.meta.rating,
        reviews
    }
};
