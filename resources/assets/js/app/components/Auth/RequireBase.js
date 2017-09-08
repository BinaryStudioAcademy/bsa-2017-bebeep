import React from 'react';

import AuthService from 'app/services/AuthService';

export const USER_TYPE = 'user';
export const GUEST_TYPE = 'guest';
export const REDIRECT_AUTH = 'login';
export const REDIRECT_ROOT = 'dashboard';

export class RequireBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: USER_TYPE,
            isAuthorized: AuthService.isAuthorized(),
            RenderComponent: null,
        };
    }

    componentWillMount() {
        const { isAuthorized } = this.state;

        if (isAuthorized) {
            this.redirectTo();
        }
    }

    componentWillReceiveProps() {
        console.log(this.state.isAuthorized, 'receive ' + this.state.type);
    }

    componentWillUpdate() {
        console.log(this.state.isAuthorized, 'update ' + this.state.type);
    }

    redirectTo(path) {
        const { router, location } = this.props;

        path = path || REDIRECT_ROOT;

        router.replace({
            pathname: '/' + path,
            state: { nextPathname: location.pathname }
        });
    }

    getRenderComponent() {
        const RenderComponent = this.state.RenderComponent;

        return RenderComponent ? <RenderComponent /> : this.props.children;
    }

    render() {
        const { type, isAuthorized } = this.state;

        return (type === GUEST_TYPE ? !isAuthorized : isAuthorized) ?
            this.getRenderComponent() : null;
    }
}

export default {
    USER_TYPE,
    GUEST_TYPE,
    RequireBase,
};
