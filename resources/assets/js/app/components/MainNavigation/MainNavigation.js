import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Navbar, Collapse, NavbarBrand, NavbarToggler } from 'reactstrap';

import { isAuthorized } from 'app/services/AuthService';

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
        const navLinks = isAuthorized() ? <ForAuthUser /> : <ForGuestUser />;

        return (
            <Navbar className="main-navigation" light toggleable="md">
                <NavbarToggler right onClick={this.toggleNavbar} />

                <NavbarBrand tag={IndexLink} to="/">BeBeep</NavbarBrand>

                <Collapse isOpen={this.state.isNavOpen} navbar>
                    { navLinks }
                </Collapse>
            </Navbar>
        );
    }
}

export default MainNavigation;
