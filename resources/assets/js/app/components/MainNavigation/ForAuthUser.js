import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import { localize } from 'react-localize-redux';

import ChangeLocalization from '../ChangeLocalization';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class ForAuthUser extends React.Component {

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
        const { user, translate } = this.props;

        return (
            <div className="d-flex w-100">
                <ul className="navbar-nav mr-auto">
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

                <Dropdown className="nav-item"
                    isOpen={ this.state.isDropdownOpen }
                    toggle={ this.toggleUserDropdown }
                >
                    <DropdownToggle caret>{ user.full_name }</DropdownToggle>
                    <DropdownMenu>
                        <Link onClick={this.toggleUserDropdown} to="/dashboard" className="dropdown-item" >
                            {translate('dashboard')}
                        </Link>
                        <Link onClick={this.toggleUserDropdown} to="/dashboard/profile" className="dropdown-item" >
                            {translate('profile')}
                        </Link>
                        <Link onClick={this.toggleUserDropdown} to="/bookings" className="dropdown-item" >
                            {translate('bookings')}
                        </Link>

                        <DropdownItem divider />

                        <Link onClick={this.toggleUserDropdown} to="/vehicles" className="dropdown-item" >
                            {translate('my_vehicles')}
                        </Link>
                        <Link onClick={this.toggleUserDropdown} to="/vehicles/create" className="dropdown-item" >
                            {translate('add_vehicle')}
                        </Link>

                        <DropdownItem divider />

                        <Link onClick={this.toggleUserDropdown} to="/logout" className="dropdown-item" >
                            {translate('logout')}
                        </Link>
                    </DropdownMenu>
                </Dropdown>

                <div className="nav-item">
                    <ChangeLocalization />
                </div>
            </div>
        );
    }
}

const ForAuthUserConnected = connect(
    (state) => ({
        user: state.user.data,
    }),
    null
)(ForAuthUser);

export default localize(ForAuthUserConnected, 'locale');
