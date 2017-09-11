import jwtDecode from 'jwt-decode';
import _ from 'lodash';

const storage = localStorage,
    tokenKeyName = 'jwt',
    redirect = {
        authPath: 'login',
        rootPath: 'dashboard',
    };

export const getAuthToken = () => {
    return storage[tokenKeyName];
};

export const isAuthorized = () => {
    return !!getAuthToken();
};

export const initSession = (token) => {
    storage.setItem(tokenKeyName, token);
};

export const destroySession = () => {
    storage.removeItem(tokenKeyName);
};

export const decodeAuthToken = () => {
    try {
        return jwtDecode(getAuthToken());

    } catch(error) {
        return null;
    }
};

export const getAuthUser = (params) => {
    const decoded = decodeAuthToken(),
        data = { user: {} };

    if (_.isEmpty(decoded)) {
        return data;
    }

    data.user = _.isEmpty(params) ? decoded : _.pick(decoded, params);

    return data;
};

export const getUserId = () => {
    if (isAuthorized()) {
        return getAuthUser(['id']).user.id;
    } else {
        return null;
    }
};

export const requireAuth = (nextState, replace) => {
    if (!isAuthorized()) {
        replace({
            pathname: '/' + redirect.authPath,
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

export const requireGuest = (nextState, replace) => {
    if (isAuthorized()) {
        replace({
            pathname: '/' + redirect.rootPath,
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

const AuthService = {
    getAuthToken,
    isAuthorized,
    initSession,
    destroySession,
    getAuthUser,
    requireAuth,
    requireGuest,
};

export default AuthService;
