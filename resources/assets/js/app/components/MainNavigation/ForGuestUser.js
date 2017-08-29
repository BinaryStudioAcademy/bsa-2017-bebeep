import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, NavLink, NavItem } from 'reactstrap';
import { localize } from 'react-localize-redux';

import ChangeLocalization from '../ChangeLocalization';

class ForGuestUser extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <Nav className="nav navbar-right ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/login" activeClassName="active">
                        { translate('login') }
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/registration" activeClassName="active">
                        { translate('register') }
                    </NavLink>
                </NavItem>
                <NavItem>
                    <ChangeLocalization />
                </NavItem>
            </Nav>
        );
    }
}

export default localize(ForGuestUser, 'locale');
