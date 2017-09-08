import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import UserDropdown from './UserDropdown';
import MainMenuItem from './Items/MainMenuItem';
import ChangeLocalization from '../ChangeLocalization';

import { checkPassengerRole, checkDriverRole } from 'app/services/UserService';
import { getProfileAvatar } from 'app/services/PhotoService';

class ForAuthUser extends React.Component {

    render() {
        const { translate, user, sessionPermissions } = this.props;

        const isDriver = checkDriverRole(sessionPermissions),
            isPassenger = checkPassengerRole(sessionPermissions);

        user.avatar = getProfileAvatar(user.avatar);

        return (
            <ul className="header__menu header__menu_right header-menu">
                <MainMenuItem linkTo="/trip/create" isShow={isDriver}>
                    { translate('create_new_trip') }
                </MainMenuItem>

                <MainMenuItem linkTo="/trips" isShow={isDriver}>
                    { translate('my_trips') }
                </MainMenuItem>

                <li className="header-menu__item header-menu__item_no-hover header-menu__item--align-stretch">
                    <UserDropdown user={user} isDriver={isDriver} isPassenger={isPassenger} />
                </li>

                <li className="header-menu__item header-menu__item_no-hover header-menu__item_no-space header-menu__item--align-stretch">
                    <ChangeLocalization />
                </li>
            </ul>
        );
    }
}

const ForAuthUserConnected = connect(
    (state) => ({
        user: state.user.profile,
    }),
    null
)(ForAuthUser);

export default localize(ForAuthUserConnected, 'locale');
