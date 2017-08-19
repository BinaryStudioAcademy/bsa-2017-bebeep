import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import ChangeLocalization from '../ChangeLocalization';
import {localize} from 'react-localize-redux';

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
        const {translate} = this.props;
        const dropdownClass = this.state.isDropdownOpen ? 'show' : '';
        const authUser = getAuthUser();

        return (
            <div className="d-flex w-100">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/vehicles" className="nav-link" activeClassName="active">
                        {translate('my_vehicles')}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/trip/create" className="nav-link" activeClassName="active">
                        {translate('create_new_trip')}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/trips" className="nav-link" activeClassName="active">
                        {translate('my_trips')}
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

                    <Link to="/dashboard" className="dropdown-item">{translate('dashboard')}</Link>
                    <Link to="/dashboard/profile" className="dropdown-item">{translate('profile')}</Link>

                    <div className="dropdown-divider"></div>

                    <Link to="/logout" className="dropdown-item">{translate('logout')}</Link>
                  </div>
                </div>
                <div className="nav-item">
                    <ChangeLocalization />
                </div>
            </div>
        );
    }
}

export default localize(ForAuthUser, 'locale');
