import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

import { isAuthorized } from 'app/services/AuthService';

import ForAuthUser from './ForAuthUser';
import ForGuestUser from './ForGuestUser';

class MainNavigation extends Component {

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
        const navClass = !this.state.isNavOpen ? 'collapse' : '';
        const navLinks = isAuthorized() ? <ForAuthUser /> : <ForGuestUser />;

        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
              <button className="navbar-toggler navbar-toggler-right" type="button"
                    data-toggle="collapse" data-target="#navbarToogle"
                    aria-controls="navbarToogle" aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={this.toggleNavbar}>

                <span className="navbar-toggler-icon"></span>
              </button>

              <IndexLink to="/" className="navbar-brand">BeBeep</IndexLink>

              <div className={"navbar-collapse " + navClass} id="navbarToogle">
                { navLinks }
              </div>
            </nav>
        );
    }
}

export default MainNavigation;
