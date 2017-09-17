import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';

import UserDropdown from './UserDropdown';
import MainMenuItem from './Items/MainMenuItem';
import ChangeLocalization from '../ChangeLocalization';

import AuthService from 'app/services/AuthService';
import { getProfileAvatar } from 'app/services/PhotoService';
import { USER_ROLE_PASSENGER, USER_ROLE_DRIVER } from 'app/services/UserService';

class ForAuthUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDriver: false,
            isPassenger: false,
        };
    }

    componentWillMount() {
        this.setUserRoles();
    }

    componentWillReceiveProps() {
        this.setUserRoles();
    }

    setUserRoles() {
        this.setState({
            isDriver: AuthService.checkPermissions(USER_ROLE_DRIVER),
            isPassenger: AuthService.checkPermissions(USER_ROLE_PASSENGER),
        });
    }

    render() {
        const { translate, user } = this.props,
            { isDriver, isPassenger } = this.state;

        user.avatar = getProfileAvatar(user.avatar);

        return (
            <ul className="header__menu header-menu">
                <MainMenuItem linkTo="/trip/create" isShow={isDriver}>
                    { translate('create_new_trip') }
                </MainMenuItem>

                <MainMenuItem linkTo="/trips" isShow={isDriver}>
                    { translate('my_trips') }
                </MainMenuItem>

                <li className="header-menu__item header-menu__item_no-hover header-menu__item--align-stretch">
                    <UserDropdown user={user} isDriver={isDriver} isPassenger={isPassenger} />
                </li>

                <li className="header-menu__item header-menu__item--smaller-margin header-menu__item--align-stretch">
                    <ChangeLocalization />
                </li>
            </ul>
        );
    }
}

export default localize(ForAuthUser, 'locale');
