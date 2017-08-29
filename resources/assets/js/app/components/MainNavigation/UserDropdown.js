import React from 'react';
import { Link } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { localize } from 'react-localize-redux';

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
        const { user, translate } = this.props;

        return (
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

export default localize(UserDropdown, 'locale');
