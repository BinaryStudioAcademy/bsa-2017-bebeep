import React from 'react';

import { RequireBase, USER_TYPE, REDIRECT_AUTH } from './RequireBase';
import AuthService from 'app/services/AuthService';

export default function(options) {

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

    class RequireUser extends RequireBase {

        constructor(props) {
            super(props);

            this.state.type = USER_TYPE;
            this.state.RenderComponent = options.component;
            this.state.permissions = options.permissions;
        }

        componentWillMount() {
            const { isAuthorized, permissions } = this.state;

            if (! isAuthorized) {
                this.redirectTo(REDIRECT_AUTH);
            }

            if (! AuthService.checkPermissions(permissions)) {
                this.setState({
                    isAuthorized: false,
                });
                this.redirectTo();
            }
        }
    }

    return RequireUser;
}
