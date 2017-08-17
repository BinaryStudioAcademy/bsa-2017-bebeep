import React, { Component } from 'react';
import { Link } from 'react-router';

import 'features/user/styles/profile.scss';

class ProfileBase extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <aside>
                      <ul className="menu-sidebar">
                        <li className="menu-sidebar__header">Profile</li>
                        <li className="menu-sidebar__item">
                            <Link to="/dashboard/profile/general"
                                className="menu-sidebar__link"
                                activeClassName="menu-sidebar__link--active"
                            >Personal info</Link>
                        </li>
                        <li className="menu-sidebar__item">
                            <Link to="/dashboard/profile/avatar"
                                className="menu-sidebar__link"
                                activeClassName="menu-sidebar__link--active"
                            >Avatar</Link>
                        </li>
                      </ul>
                    </aside>

                    <aside>
                      <ul className="menu-sidebar">
                        <li className="menu-sidebar__header">Account</li>
                        <li className="menu-sidebar__item">
                            <Link to="/dashboard/profile/password"
                                className="menu-sidebar__link"
                                activeClassName="menu-sidebar__link--active"
                            >Change password</Link>
                        </li>
                      </ul>
                    </aside>
                </div>
                <div className="col-9">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default ProfileBase;
