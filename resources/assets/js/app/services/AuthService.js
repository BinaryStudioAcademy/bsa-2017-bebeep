import jwtDecode from 'jwt-decode';
import _ from 'lodash';

const storage = localStorage,
    tokenKeyName = 'jwt',
    redirect = {
        authPath: 'login',
        rootPath: 'dashboard',
    },
    userProps = ['first_name', 'last_name', 'avatar',];

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

export const getSessionData = () => {
    const decoded = decodeAuthToken();

    if (_.isEmpty(decoded)) {
        return null;
    }

    return _.transform(decoded, function(result, value, key) {
        if (userProps.indexOf(key) !== -1) {
            result['user'][key] = value;
        } else {
            result['session'][key] = value;
        }
    }, { user: {}, session: {}, });
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
    getSessionData,
    requireAuth,
    requireGuest,
};

export default AuthService;
