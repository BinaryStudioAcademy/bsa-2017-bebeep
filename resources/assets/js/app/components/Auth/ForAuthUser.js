import React from 'react';

import AuthService from 'app/services/AuthService';

export default function(options) {

    const REDIRECT_PATH_IF_NOT_AUTH_STATUS = 'login',
        REDIRECT_PATH_IF_NOT_AUTH_PERMS = 'dashboard';

    const defaultOptions = {
        component: null,
        permissions: null,
    };

    if (typeof options !== 'object') {
        options = { component: options };
    }
    options = {
        ...defaultOptions,
        ...options,
    };

    const RenderComponent = options.component,
        { permissions } = options;

    class ForAuthUser extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                isAuthorized: AuthService.isAuthorized(),
            };
        }

        componentWillMount() {
            const { isAuthorized } = this.state;

            if (! isAuthorized) {
                this.redirectTo();
            }

            if (! AuthService.checkPermissions(permissions)) {
                this.setState({
                    isAuthorized: false,
                });
                this.redirectTo(REDIRECT_PATH_IF_NOT_AUTH_PERMS);
            }
        }

        componentWillReceiveProps(nextProps) {
            console.log(this.state.isAuthorized, 'receive auth');
        }

        componentWillUpdate() {
            console.log(this.state.isAuthorized, 'update auth');
        }

        redirectTo(redirectPath) {
            const { router, location } = this.props;

            redirectPath = redirectPath || REDIRECT_PATH_IF_NOT_AUTH_STATUS;

            router.replace({
                pathname: '/' + redirectPath,
                state: { nextPathname: location.pathname }
            });
        }

        getRenderComponent() {
            return RenderComponent ? <RenderComponent /> : this.props.children;
        }

        render() {
            const { isAuthorized } = this.state;

            return isAuthorized ? this.getRenderComponent() : null;
        }
    }

    return ForAuthUser;
}
