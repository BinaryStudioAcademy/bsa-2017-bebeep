import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import DataStorage from '../helpers/DataStorage';

import { securedRequest } from './RequestService';
import {
    setSessionData,
    unsetSessionData,
    setSessionToken,
    loginSuccess,
    logoutSuccess
} from 'features/user/actions';


const AuthService = (() => {

    const TOKEN_KEY_NAME = 'session_token',
        REQUEST_SESSION_DATA = '/api/authentication/me',
        USER_PROPS = ['first_name', 'last_name', 'avatar',];

    let _this = null,
        store = null;

    const getFromState = (param) => {
        return store.getState().user.session[param];
    };

    const setSessionDataToState = () => {
        const token = getSessionTokenFromStorage();

        if (! _this.isSessionTokenValid(token)) {
            removeSessionTokenFromStorage();
            return false;
        }

        store.dispatch(setSessionToken(token));

        const sessionData = _this.getSessionData();
        store.dispatch(setSessionData(sessionData));

        return true;
    };

    const setSessionTokenToStorage = (token) => {
        DataStorage.setData(TOKEN_KEY_NAME, token);
    };

    const getSessionTokenFromStorage = () => {
        return DataStorage.getData(TOKEN_KEY_NAME);
    };

    const removeSessionTokenFromStorage = () => {
        DataStorage.removeData(TOKEN_KEY_NAME);
    };

    const decodeSessionToken = (token) => {
        token = token || _this.getSessionToken();
        try {
            return jwtDecode(token);

        } catch(error) {
            return null;
        }
    };

    return {
        init(globalStore) {
            _this = this;
            store = globalStore;

            setSessionDataToState();
        },

        initSession(token) {
            setSessionTokenToStorage(token);

            if (! setSessionDataToState()) {
                return false;
            }

            store.dispatch(loginSuccess());
        },

        destroySession() {
            removeSessionTokenFromStorage();

            store.dispatch(unsetSessionData());
            store.dispatch(logoutSuccess());
        },

        getUserId() {
            if (! _this.isAuthorized()) {
                return null;
            }
            return getFromState('sub');
            //return getAuthUser(['id']).user.id;
        },

        getSessionData(userData) {
            const decoded = decodeSessionToken();

            const data = _.transform(decoded, function(result, value, key) {
                if (USER_PROPS.indexOf(key) !== -1) {
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

        getSessionDataFromServer(onSuccess, onError) {
            onError = onError || onSuccess;

            securedRequest.get(REQUEST_SESSION_DATA)
                .then(response => {
                    const sessionData = _this.getSessionData(response.data.data);

                    store.dispatch(setSessionData(sessionData));
                    store.dispatch(loginSuccess());
                    onSuccess();
                })
                .catch(error => {
                    _this.destroySession();
                    onError();
                });
        },

        isAuthorized() {
            return getFromState('isAuthorized');
        },

        checkPermissions(permissions, identically) {
            const sessionPermissions = getFromState('permissions');

            if (! permissions) {
                return true;
            }

            return identically
                ? permissions === sessionPermissions
                : !! (permissions & sessionPermissions);
        },

        getSessionToken() {
            return getFromState('token');
        },

        isSessionTokenValid(token) {
            return !! decodeSessionToken(token);
        },
    };
})();

export default AuthService;
