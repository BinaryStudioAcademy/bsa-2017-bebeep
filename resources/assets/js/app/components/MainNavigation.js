import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

import { isAuthTokenExists, getAuthUser } from '../services/AuthService';

class MainNavigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isDropdownOpen: false,
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
    }

    toggleNavbar() {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    toggleUserDropdown() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    render() {
        const navClass = !this.state.isNavOpen ? 'collapse' : '';
        const dropdownClass = this.state.isDropdownOpen ? 'show' : '';
        const logInUrl = isAuthTokenExists() ? '/logout' : '/login';
        const logInMsg = isAuthTokenExists() ? 'Logout' : 'Login';

        const authUser = getAuthUser();

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
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/vehicles" className="nav-link">Vehicles</Link>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                    <Link to={ logInUrl } className="nav-link">{ logInMsg }</Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/registration" className="nav-link">Register</Link>
                  </li>
                </ul>

                <div className={"nav-item dropdown " + dropdownClass}>

                  <button className="btn btn-secondary dropdown-toggle"
                      type="button" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded={this.state.isDropdownOpen}
                      onClick={this.toggleUserDropdown}>
                    { authUser.username }
                  </button>

                  <div className="dropdown-menu dropdown-menu-right">
                    <Link to="#" className="dropdown-item">Dashboard</Link>
                    <Link to="#" className="dropdown-item">My trips</Link>
                    <Link to="#" className="dropdown-item">My bookings</Link>
                    <Link to="#" className="dropdown-item">Profile</Link>
                    <Link to="/trip/create" className="dropdown-item">Create new trip</Link>

                    <div className="dropdown-divider"></div>

                    <Link to="#" className="dropdown-item">Logout</Link>
                  </div>
                </div>
              </div>
            </nav>
        );
    }
}

export default MainNavigation;
