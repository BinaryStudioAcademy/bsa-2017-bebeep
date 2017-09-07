import jwtDecode from 'jwt-decode';
import _ from 'lodash';

const AuthService = (() => {

    const storage = localStorage,
        tokenKeyName = 'jwt',
        redirect = {
            authPath: 'login',
            rootPath: 'dashboard',
        },
        userProps = ['first_name', 'last_name', 'avatar',];

    let _this = null,
        store = null,
        loginSuccess = null;

    return {
        init(params) {
            _this = this;
            store = params.store;
            loginSuccess = params.loginSuccess;
        },

        getSessionToken() {
            return storage[tokenKeyName];
        },

        isAuthorized() {
            return store.getState().user.login.success;
        },

        isSessionTokenExists() {
            return !!_this.getSessionToken();
        },

        initSession(token) {
            storage.setItem(tokenKeyName, token);
        },

        destroySession() {
            storage.removeItem(tokenKeyName);
        },

        decodeAuthToken() {
            try {
                return jwtDecode(_this.getSessionToken());

            } catch(error) {
                return null;
            }
        },

        getSessionData() {
            const decoded = _this.decodeAuthToken();

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
        },

        setSession() {
            if (! _this.isSessionTokenExists()) {
                return false;
            }

            const token = _this.getSessionToken();

            store.dispatch( loginSuccess(_this.getSessionData()) );
        },

        checkPermissions(permissions, identically) {
            if (permissions === undefined || permissions === null) {
                return true;
            }

            const sessionPermissions = store.getState().user.session.permissions;

            return identically
                ? permissions === sessionPermissions
                : !!(permissions & sessionPermissions);
        },

        requireAuth(params) {
            if (arguments.length !== 1) {
                params = {
                    permissions: null,
                    route: { nextState: arguments[0], replace: arguments[1], },
                };
            }

            const { route, permissions } = params;

            if (! _this.isAuthorized() ||
                ! _this.checkPermissions(permissions)
            ) {
                route.replace({
                    pathname: '/' + redirect.authPath,
                    state: { nextPathname: route.nextState.location.pathname }
                })
            }
        },

        requireGuest(nextState, replace) {
            if (_this.isAuthorized()) {
                replace({
                    pathname: '/' + redirect.rootPath,
                    state: { nextPathname: nextState.location.pathname }
                })
            }
        },

    };
})();

export default AuthService;
