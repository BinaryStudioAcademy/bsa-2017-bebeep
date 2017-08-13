import jwtDecode from 'jwt-decode';
import _ from 'lodash';

const storage = sessionStorage,
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
    const decoded = decodeAuthToken();

    if (_.isEmpty(decoded)) {
        return { username: 'Guest' };
    }
    if (_.isEmpty(params)) {
        return decoded;
    }
    return _.pick(decoded, params);
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
