import React from 'react';
import { Link } from 'react-router';
import LangService from '../../../../app/services/LangService';
import * as lang from '../../lang/Profile/ProfileBase.locale.json';
import {localize} from 'react-localize-redux';

import 'features/user/styles/profile.scss';

class ProfileBase extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div className="row">
                <div className="col-3">
                    <aside>
                      <ul className="menu-sidebar">
                        <li className="menu-sidebar__header">{translate('profile_base.profile')}</li>
                        <li className="menu-sidebar__item">
                            <Link to="/dashboard/profile/general"
                                className="menu-sidebar__link"
                                activeClassName="menu-sidebar__link--active"
                            >{translate('profile_base.personal_info')}</Link>
                        </li>
                        <li className="menu-sidebar__item">
                            <Link to="/dashboard/profile/avatar"
                                className="menu-sidebar__link"
                                activeClassName="menu-sidebar__link--active"
                            >{translate('profile_base.avatar')}</Link>
                        </li>
                      </ul>
                    </aside>

                    <aside>
                      <ul className="menu-sidebar">
                        <li className="menu-sidebar__header">{translate('profile_base.account')}</li>
                        <li className="menu-sidebar__item">
                            <Link to="/dashboard/profile/password"
                                className="menu-sidebar__link"
                                activeClassName="menu-sidebar__link--active"
                            >{translate('profile_base.change_password')}</Link>
                        </li>
                      </ul>
                    </aside>


                    <aside>
                        <ul className="menu-sidebar">
                            <li className="menu-sidebar__header">{translate('profile_base.reviews')}</li>
                            <li className="menu-sidebar__item">
                                <Link to="/dashboard/profile/reviews/left"
                                      className="menu-sidebar__link"
                                      activeClassName="menu-sidebar__link--active"
                                >{translate('profile_base.reviews_left')}</Link>
                                <Link to="/dashboard/profile/reviews/received"
                                      className="menu-sidebar__link"
                                      activeClassName="menu-sidebar__link--active"
                                >{translate('profile_base.reviews_received')}</Link>
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

export default localize(ProfileBase, 'locale');
