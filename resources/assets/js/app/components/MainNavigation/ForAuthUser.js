import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import { Nav, NavLink, NavItem } from 'reactstrap';
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
            <div className="d-flex align-items-md-center w-100">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/trip/create" activeClassName="active">
                            { translate('create_new_trip') }
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/trips" activeClassName="active">
                            { translate('my_trips') }
                        </NavLink>
                    </NavItem>
                </Nav>

                <Nav className="mt-3 mt-lg-0" navbar>
                    <NavItem>
                        <Dropdown className="main-navigation-dropdown user-personal-menu"
                            isOpen={ this.state.isDropdownOpen }
                            toggle={ this.toggleUserDropdown }
                        >
                            <DropdownToggle className="main-navigation-dropdown__dropdown-toggle" caret>
                                <img src={ user.avatar }
                                    alt={ user.full_name }
                                    className="user-personal-menu__avatar"
                                />
                                <span className="main-navigation-dropdown__toggle-label">
                                    { user.full_name }
                                </span>
                            </DropdownToggle>

                            <DropdownMenu right>
                                <Link onClick={this.toggleUserDropdown} to="/dashboard" className="dropdown-item">
                                    { translate('dashboard') }
                                </Link>
                                <Link onClick={this.toggleUserDropdown} to="/dashboard/profile" className="dropdown-item">
                                    { translate('profile') }
                                </Link>
                                <Link onClick={this.toggleUserDropdown} to="/bookings" className="dropdown-item">
                                    { translate('bookings') }
                                </Link>

                                <DropdownItem divider />

                                <Link onClick={this.toggleUserDropdown} to="/vehicles" className="dropdown-item">
                                    { translate('my_vehicles') }
                                </Link>
                                <Link onClick={this.toggleUserDropdown} to="/vehicles/create" className="dropdown-item">
                                    { translate('add_vehicle') }
                                </Link>

                                <DropdownItem divider />

                                <Link onClick={this.toggleUserDropdown} to="/logout" className="dropdown-item">
                                    <i className="fa fa-sign-out fa-fw mr-2" aria-hidden="true" />
                                    { translate('logout') }
                                </Link>
                            </DropdownMenu>
                        </Dropdown>

                    </NavItem>
                    <NavItem>
                        <ChangeLocalization />
                    </NavItem>
                </Nav>
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
