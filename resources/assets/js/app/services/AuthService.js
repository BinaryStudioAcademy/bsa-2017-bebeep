import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import DataStorage from '../helpers/DataStorage';

import { securedRequest } from './RequestService';
import {
    setAuthSession,
    unsetAuthSession,
    setSessionToken,
    loginSuccess,
    logoutSuccess
} from 'features/user/actions';

const AuthService = (() => {

    const tokenKeyName = 'jwt',
        userProps = ['first_name', 'last_name', 'avatar',];

    let _this = null,
        store = null;

    return {
        init(globalStore) {
            _this = this;
            store = globalStore;

            _this.setSessionTokenToState();
        },

        getFromState(param) {
            return store.getState().user.session[param];
        },

        setSessionTokenToState() {
            const token = DataStorage.getData(tokenKeyName);

            if (! _this.isSessionTokenValid(token)) {
                _this.removeSessionTokenFromStorage();
                return false;
            }

            store.dispatch(setSessionToken(token));

            return true;
        },

        setSessionTokenToStorage(token) {
            DataStorage.setData(tokenKeyName, token);

            return _this;
        },

        removeSessionTokenFromStorage() {
            DataStorage.removeData(tokenKeyName);

            return _this;
        },

        initSession(token) {
            _this.setSessionTokenToStorage(token);

            if (! _this.setSessionTokenToState()) {
                return false;
            }

            const sessionData = _this.getSessionData();

            store.dispatch(setAuthSession(sessionData));
            store.dispatch(loginSuccess());
        },

        destroySession() {
            _this.removeSessionTokenFromStorage();

            store.dispatch(unsetAuthSession());
            store.dispatch(logoutSuccess());
        },

        getSessionToken() {
            return _this.getFromState('token');
        },

        getSessionDataFromServer(onSuccess, onError) {
            onError = onError || onSuccess;

            const requestPath = '/api/authentication/me';

            securedRequest.get(requestPath)
                .then(response => {
                    const sessionData = _this.getSessionData(response.data.data);

                    store.dispatch(setAuthSession(sessionData));
                    store.dispatch(loginSuccess());
                    onSuccess();
                })
                .catch(error => {
                    _this.destroySession();
                    onError();
                });
        },

        getSessionData(userData) {
            const decoded = _this.decodeAuthToken();

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

        isAuthorized() {
            return _this.getFromState('isAuthorized');
        },

        isSessionTokenValid(token) {
            return !!_this.decodeAuthToken(token);
        },

        decodeAuthToken(token) {
            token = token || _this.getSessionToken();

            try {
                return jwtDecode(token);

            } catch(error) {
                return null;
            }
        },

        checkPermissions(permissions, identically) {
            const sessionPermissions = _this.getFromState('permissions');

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
