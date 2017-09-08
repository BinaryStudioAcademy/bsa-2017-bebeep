import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Preloader from '../Preloader';

import { loginSuccess } from 'features/user/actions';

import AuthService from 'app/services/AuthService';
import { securedRequest } from 'app/services/RequestService';

export default function(options) {

    const REDIRECT_PATH = 'login';
    const GET_AUTH_USER_REQUEST_PATH = '/api/authentication/me';

    const defaultOptions = {
        component: null,
        permissions: null,
    };
    options = {
        ...defaultOptions,
        ...options,
    };

    const { component, permissions } = options;

    class ForAuthUser extends React.Component {

        componentWillMount() {
            const { isAuthorized, loginSuccess } = this.props;

            if (AuthService.isAuthorized(permissions)) {
                return true;
            }

            if (! AuthService.isSessionTokenValid()) {
                this.redirectTo();
                return false;
            }

            const token = AuthService.getSessionToken();

            securedRequest.get(GET_AUTH_USER_REQUEST_PATH)
                .then(response => {
                    const data = response.data.data;

                    loginSuccess(AuthService.getSessionData(data));

                    const sessionPermissions = this.props.sessionPermissions;

                    console.log(sessionPermissions, 'perm');
                    console.log( AuthService.getFromState('permissions') );

                    /*if (! AuthService.checkPermissions(permissions)) {
                        redirect();
                    }*/
                })
                .catch(error => {
                    //console.log(error);
                    AuthService.destroySession();
                    this.redirectTo();
                });
        }

        componentWillUpdate(nextProps) {
            console.log('will update');
          // if(!this.state.authenticated) {
          //   // Use your router to redirect them to login page
          // }
        }

        redirectTo() {
            const { router, location } = this.props;

            router.replace({
                pathname: '/' + REDIRECT_PATH,
                state: { nextPathname: location.pathname }
            });
        }

        getComponent() {
            return component ? component : this.props.children;
        }

        render() {
            const { isAuthorized } = this.props;

            return !isAuthorized
                ? <Preloader enable={true}/>
                : this.getComponent();
        }
    }

    return connect(
        state => ({
            isAuthorized: state.user.session.isAuthorized,
            sessionExpired: state.user.session.exp,
            sessionPermissions: state.user.session.permissions,
        }),
        (dispatch) =>
            bindActionCreators({ loginSuccess }, dispatch)
    )(ForAuthUser);
}
