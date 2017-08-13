import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

import { getAuthUser } from '../../services/AuthService';

class ForAuthUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDropdownOpen: false,
        };

        this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
    }

    toggleUserDropdown() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    render() {
        const dropdownClass = this.state.isDropdownOpen ? 'show' : '';
        const authUser = getAuthUser();

        return (
            <div className="d-flex w-100">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/vehicles" className="nav-link" activeClassName="active">
                        My vehicles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/trip/create" className="nav-link" activeClassName="active">
                        Create new trip
                    </Link>
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

                    <div className="dropdown-divider"></div>

                    <Link to="/logout" className="dropdown-item">Logout</Link>
                  </div>
                </div>
            </div>
        );
    }
}

export default ForAuthUser;
