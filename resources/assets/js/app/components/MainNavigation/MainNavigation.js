import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

import ForAuthUser from './ForAuthUser';
import ForGuestUser from './ForGuestUser';

class MainNavigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    render() {
        const navClass = !this.state.isNavOpen ? 'collapse' : '',
            { isAuthorized, user } = this.props;

        const mainNavigation = isAuthorized
            ? <ForAuthUser user={user} />
            : <ForGuestUser />;

        return (
            <header className="header">
                <div className="header__container container clearfix">
                    <IndexLink to="/" className="header__logo logo">
                        <img src="/template/img/logo.png" alt="BeBeep" />
                    </IndexLink>

                    { mainNavigation }
                </div>
            </header>
        );
    }
}

const MainNavigationConnected = connect(
    state => ({
        isAuthorized: state.user.login.success,
        user: state.user.profile,
    }),
    null
)(MainNavigation);

export default MainNavigationConnected;
