import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import { securedRequest } from './RequestService';

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

        getFromState(param) {
            return store.getState().user.session[param];
        },

        getSessionToken() {
            return _this.getFromState('token') || storage[tokenKeyName];
        },

        getSessionDataFromServer(onSuccess, onError) {
            const requestPath = '/api/authentication/me';

            securedRequest.get(requestPath)
                .then(response => {
                    const data = response.data.data;

                    store.dispatch( loginSuccess(_this.getSessionData(data)) );
                    onSuccess();
                })
                .catch(error => {
                    _this.destroySession();
                    onError();
                });
        },

        isAuthorized(permissions, identically) {
            if (! _this.getFromState('isAuthorized')) {
                return false;
            }
            return _this.checkPermissions(permissions, identically);
        },

        isSessionTokenValid() {
            return !!_this.decodeAuthToken();
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

        getSessionData(userData) {
            const decoded = _this.decodeAuthToken();

            if (_.isEmpty(decoded)) {
                return null;
            }

            const data = _.transform(decoded, function(result, value, key) {
                if (userProps.indexOf(key) !== -1) {
                    result['user'][key] = value;
                } else {
                    result['session'][key] = value;
                }
            }, { user: {}, session: {}, });

            if (! _.isEmpty(userData)) {
                data.user = userData;
            }
            data.session.token = _this.getSessionToken();

            return data;
        },

        checkPermissions(permissions, identically) {
            const sessionPermissions = _this.getFromState('permissions');

            console.log(permissions);
            console.log(sessionPermissions);

            if (! permissions || ! sessionPermissions) {
                return true;
            }

            return identically
                ? sessionPermissions === permissions
                : !!(sessionPermissions & permissions);
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
