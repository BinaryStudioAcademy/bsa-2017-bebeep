import React from 'react';

import { RequireBase, GUEST_TYPE } from './RequireBase';

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

    class RequireGuest extends RequireBase {

        constructor(props) {
            super(props);

            this.state.type = GUEST_TYPE;
            this.state.RenderComponent = options.component;
        }

        redirectTo() {
            super.redirectTo(REDIRECT_PATH);
        }
    }

    return RequireGuest;
}
