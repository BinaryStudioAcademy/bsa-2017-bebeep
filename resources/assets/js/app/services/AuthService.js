import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import { securedRequest } from './RequestService';

const AuthService = (() => {

    const storage = localStorage,
        tokenKeyName = 'jwt',
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
                    const userData = response.data.data;

                    store.dispatch( loginSuccess(_this.getSessionData(userData)) );
                    onSuccess();
                })
                .catch(error => {
                    _this.destroySession();
                    onError();
                });
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
                data.session.permissions = userData.permissions;
            }
            data.session.token = _this.getSessionToken();

            return data;
        },

        initSession(token) {
            storage.setItem(tokenKeyName, token);
        },

        destroySession() {
            storage.removeItem(tokenKeyName);
        },

        isAuthorized() {
            return _this.getFromState('isAuthorized');
        },

        isSessionTokenValid() {
            return !!_this.decodeAuthToken();
        },

        decodeAuthToken() {
            try {
                return jwtDecode(_this.getSessionToken());

            } catch(error) {
                return null;
            }
        },

        checkPermissions(permissions, identically) {
            const sessionPermissions = _this.getFromState('permissions');

            console.log(sessionPermissions);

            if (! permissions) {
                return true;
            }

            return identically
                ? permissions === sessionPermissions
                : !!(permissions & sessionPermissions);
        },
    };
})();

export default AuthService;
