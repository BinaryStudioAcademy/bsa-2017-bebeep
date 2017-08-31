import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import UserDropdown from './UserDropdown';
import ChangeLocalization from '../ChangeLocalization';

import { getProfileAvatar } from 'app/services/PhotoService';


class ForAuthUser extends React.Component {

    render() {
        const { user, translate } = this.props;

        user.avatar = getProfileAvatar(user.avatar);

        return (
            <ul className="header__menu header__menu_right header-menu">
                <li className="header-menu__item">
                    <Link to="/trip/create" activeClassName="active">
                        { translate('create_new_trip') }
                    </Link>
                </li>
                <li className="header-menu__item">
                    <Link to="/trips" activeClassName="active">
                        { translate('my_trips') }
                    </Link>
                </li>

                <li className="header-menu__item header-menu__item_no-hover">
                    <UserDropdown user={user} />
                </li>

                <li className="header-menu__item header-menu__item_no-hover header-menu__item_no-space">
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
