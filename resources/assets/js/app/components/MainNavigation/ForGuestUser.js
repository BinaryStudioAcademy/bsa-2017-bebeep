import React from 'react';
import { Link, IndexLink } from 'react-router';

class ForGuestUser extends React.Component {

    render() {
        return (
            <div className="d-flex w-100">
                <ul className="nav navbar-nav navbar-right ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" activeClassName="active">
                        Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/registration" className="nav-link" activeClassName="active">
                        Register
                    </Link>
                  </li>
                </ul>
            </div>
        );
    }
}

export default ForGuestUser;
