import React from 'react';
import { Link, IndexLink } from 'react-router';
import ChangeLocalization from '../ChangeLocalization';
import {localize} from 'react-localize-redux';

class ForGuestUser extends React.Component {

    render() {
        const {translate} = this.props;
        return (
            <div className="d-flex w-100">
                <ul className="nav navbar-nav navbar-right ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" activeClassName="active">
                        {translate('login')}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/registration" className="nav-link" activeClassName="active">
                        {translate('register')}
                    </Link>
                  </li>
                  <li className="nav-item">
                      <ChangeLocalization />
                  </li>
                </ul>
            </div>
        );
    }
}

export default localize(ForGuestUser, 'locale');
