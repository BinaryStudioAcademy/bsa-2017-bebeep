import React from 'react';

import AuthService from 'app/services/AuthService';

export default function(options) {

    const REDIRECT_PATH = 'dashboard';

    const defaultOptions = {
        component: null,
    };

    if (typeof options !== 'object') {
        options = { component: options };
    }
    options = {
        ...defaultOptions,
        ...options,
    };

    const RenderComponent = options.component;

    class ForGuest extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                isAuthorized: AuthService.isAuthorized(),
            };
        }

        componentWillMount() {
            const { isAuthorized } = this.state;

            if (isAuthorized) {
                this.redirectTo();
            }
        }

        redirectTo() {
            const { router, location } = this.props;

            router.replace({
                pathname: '/' + REDIRECT_PATH,
                state: { nextPathname: location.pathname }
            });
        }

        getRenderComponent() {
            return RenderComponent ? <RenderComponent /> : this.props.children;
        }

        render() {
            const { isAuthorized } = this.state;

            return isAuthorized ? null : this.getRenderComponent();
        }
    }

    return ForGuest;
}
