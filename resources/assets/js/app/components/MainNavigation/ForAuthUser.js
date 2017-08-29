import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Nav, NavLink, NavItem } from 'reactstrap';
import { localize } from 'react-localize-redux';

import UserDropdown from './UserDropdown';
import ChangeLocalization from '../ChangeLocalization';


class ForAuthUser extends React.Component {

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

                <Nav className="main-navigation__dropdowns" navbar>
                    <NavItem>
                        <UserDropdown user={user} />
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
