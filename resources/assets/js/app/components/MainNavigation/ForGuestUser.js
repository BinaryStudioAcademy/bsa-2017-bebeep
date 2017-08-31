import React from 'react';
import { Link, IndexLink } from 'react-router';
import ChangeLocalization from '../ChangeLocalization';
import {localize} from 'react-localize-redux';

class ForGuestUser extends React.Component {

    render() {
        const {translate} = this.props;
        return (
            <ul className="header__menu header__menu_right header-menu">
                <li className="header-menu__item">
                    <Link to="/login" activeClassName="active">
                        {translate('login')}
                    </Link>
                </li>
                <li className="header-menu__item">
                    <Link to="/registration" activeClassName="active">
                        {translate('register')}
                    </Link>
                </li>
                <li className="header-menu__item header-menu__item_no-hover">
                    <ChangeLocalization />
                </li>
            </ul>
        );
    }
}

export default localize(ForGuestUser, 'locale');
