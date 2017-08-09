import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

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
                    <li className="nav-item">
                        <Link to="/trips" className="nav-link">Trips</Link>
                    </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                    <Link to="#" className="nav-link">Login</Link>
                  </li>

                  <li className="nav-item">
                    <Link to="#" className="nav-link">Register</Link>
                  </li>
                </ul>

                <div className={"nav-item dropdown " + dropdownClass}>

                  <button className="btn btn-secondary dropdown-toggle"
                      type="button" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded={this.state.isDropdownOpen}
                      onClick={this.toggleUserDropdown}>
                    User Name
                  </button>

                  <div className="dropdown-menu dropdown-menu-right">
                    <Link to="#" className="dropdown-item">Dashboard</Link>
                    <Link to="#" className="dropdown-item">My trips</Link>
                    <Link to="#" className="dropdown-item">My bookings</Link>
                    <Link to="#" className="dropdown-item">Profile</Link>

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
