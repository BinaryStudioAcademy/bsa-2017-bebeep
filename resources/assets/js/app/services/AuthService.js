import jwtDecode from 'jwt-decode';
import _ from 'lodash';

const storage = sessionStorage,
    tokenKeyName = 'jwt',
    redirectPaths = {
        not_auth: 'login',
        auth: 'dashboard',
    };

export const getAuthToken = () => {
    return storage[tokenKeyName];
};

export const isAuthorized = () => {
    return !!getAuthToken();
};

export const setAuthToken = (token) => {
    storage.setItem(tokenKeyName, token);
};

export const removeAuthToken = () => {
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
            pathname: '/' + redirectPaths.not_auth,
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

export const alreadyAuth = (nextState, replace) => {
    if (isAuthorized()) {
        replace({
            pathname: '/' + redirectPaths.auth,
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

const AuthService = {
    getAuthToken,
    isAuthorized,
    setAuthToken,
    removeAuthToken,
    getAuthUser,
    requireAuth,
    alreadyAuth,
};

export default AuthService;
