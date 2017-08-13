
const storage = sessionStorage,
    tokenKeyName = 'jwt',
    redirectPaths = {
        not_auth: 'login',
        auth: 'dashboard',
    };

export const getAuthToken = () => {
    return storage[tokenKeyName];
};

export const isAuthTokenExists = () => {
    return !!getAuthToken();
};

export const setAuthToken = (token) => {
    storage.setItem(tokenKeyName, token);
};

export const removeAuthToken = () => {
    storage.removeItem(tokenKeyName);
};

export const requireAuth = (nextState, replace) => {
    if (!isAuthTokenExists()) {
        replace({
            pathname: '/' + redirectPaths.not_auth,
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

export const alreadyAuth = (nextState, replace) => {
    if (isAuthTokenExists()) {
        replace({
            pathname: '/' + redirectPaths.auth,
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

const AuthService = {
    getAuthToken,
    isAuthTokenExists,
    setAuthToken,
    removeAuthToken,
    requireAuth,
    alreadyAuth,
};

export default AuthService;
