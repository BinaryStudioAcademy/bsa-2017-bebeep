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
            <div className="d-flex align-items-md-center w-100">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/trip/create" className="nav-link" activeClassName="active">
                            { translate('create_new_trip') }
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/trips" className="nav-link" activeClassName="active">
                            { translate('my_trips') }
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav main-navigation__dropdowns">
                    <li className="nav-item">
                        <UserDropdown user={user} />
                    </li>
                    <li className="nav-item">
                        <ChangeLocalization />
                    </li>
                </ul>
            </div>
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
