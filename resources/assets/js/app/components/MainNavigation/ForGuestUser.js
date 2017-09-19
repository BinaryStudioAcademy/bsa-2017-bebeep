import React from 'react';
import { Link, IndexLink } from 'react-router';
import { localize } from 'react-localize-redux';

import ChangeLocalization from '../ChangeLocalization';
import ChangeCurrency from 'features/currency/components/ChangeCurrency';

class ForGuestUser extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <ul className="header__menu header-menu">
                <li className="header-menu__item">
                    <Link to="/login" activeClassName="active">
                        { translate('login') }
                    </Link>
                </li>
                <li className="header-menu__item">
                    <Link to="/registration" activeClassName="active">
                        { translate('register') }
                    </Link>
                </li>
                <li className="header-menu__item header-menu__item--bigger-margin header-menu__item--align-stretch">
                    <ChangeCurrency />
                </li>
                <li className="header-menu__item header-menu__item--align-stretch">
                    <ChangeLocalization />
                </li>
            </ul>
        );
    }
}

export default localize(ForGuestUser, 'locale');
