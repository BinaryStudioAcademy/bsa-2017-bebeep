import React from 'react';
import { Link } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import UserDropdownItem from './Items/UserDropdownItem';

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

    renderDivider(isShow) {
        return isShow ? <DropdownItem divider /> : null;
    }

    render() {
        const { translate, user, isDriver, isPassenger, countNotifications } = this.props,
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
                    <UserDropdownItem linkTo="/dashboard"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('dashboard') }
                    </UserDropdownItem>

                    <UserDropdownItem linkTo="/dashboard/profile"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('profile') }
                    </UserDropdownItem>

                    <UserDropdownItem linkTo="/dashboard/notifications"
                        onClick={this.toggleUserDropdown}
                    >
                        <span className={(countNotifications ? " has-notification" : "")}>
                            { translate('notifications.header') }
                        </span>
                    </UserDropdownItem>

                    <UserDropdownItem linkTo="/bookings"
                        isShow={isPassenger}
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('bookings') }
                    </UserDropdownItem>

                    <DropdownItem divider />

                    <UserDropdownItem linkTo="/dashboard/subscriptions"
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('subscriptions') }
                    </UserDropdownItem>

                    { this.renderDivider(isDriver) }

                    <UserDropdownItem linkTo="/vehicles"
                        isShow={isDriver}
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('my_vehicles') }
                    </UserDropdownItem>

                    <UserDropdownItem linkTo="/vehicles/create"
                        isShow={isDriver}
                        onClick={this.toggleUserDropdown}
                    >
                        { translate('add_vehicle') }
                    </UserDropdownItem>

                    <DropdownItem divider />

                    <UserDropdownItem linkTo="/logout"
                        onClick={this.toggleUserDropdown}
                    >
                        <i className="fa fa-sign-out fa-fw mr-2" aria-hidden="true" />
                        { translate('logout') }
                    </UserDropdownItem>

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
