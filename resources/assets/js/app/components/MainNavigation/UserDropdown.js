import React from 'react';
import { Link } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {connect} from 'react-redux';
import { getTranslate } from 'react-localize-redux';


class UserDropdown extends React.Component {

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
        const { user, translate, countNotifications } = this.props,
            userName = `${user.first_name} ${user.last_name}`;

        return (
            <Dropdown className="header-menu__dropdown header-menu__dropdown--user-menu"
                isOpen={ this.state.isDropdownOpen }
                toggle={ this.toggleUserDropdown }
            >
                <DropdownToggle caret className={(countNotifications ? " has-notification" : "")}>
                    <img src={ user.avatar }
                        alt={ userName }
                        className="header-menu__dropdown--user-menu__avatar"
                    />
                    <span>{ userName }</span>
                </DropdownToggle>

                <DropdownMenu right>
                    <Link to="/dashboard"
                        className="dropdown-item"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('dashboard') }
                    </Link>

                    <Link to="/dashboard/profile"
                        className="dropdown-item"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('profile') }
                    </Link>

                    <Link to="/dashboard/notifications"
                          className="dropdown-item"
                          onClick={this.toggleUserDropdown}
                    >
                        <span className={(countNotifications ? " has-notification" : "")}>
                            { translate('notifications') }
                        </span>
                    </Link>

                    <Link to="/bookings"
                        className="dropdown-item"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('bookings') }
                    </Link>

                    <DropdownItem divider />

                    <Link to="/vehicles"
                        className="dropdown-item"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('my_vehicles') }
                    </Link>

                    <Link to="/vehicles/create"
                        className="dropdown-item"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('add_vehicle') }
                    </Link>

                    <DropdownItem divider />

                    <Link to="/logout"
                        className="dropdown-item"
                        onClick={this.toggleUserDropdown}
                    >
                        <i className="fa fa-sign-out fa-fw mr-2" aria-hidden="true" />
                        { translate('logout') }
                    </Link>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        countNotifications: state.notifications.countUnread
    })
)(UserDropdown);
