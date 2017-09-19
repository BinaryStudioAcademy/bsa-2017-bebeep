import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';
import { Collapse, NavbarToggler } from 'reactstrap';

import ContainerWrapper from 'app/layouts/ContainerWrapper';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfileBase.locale.json';

import 'features/user/styles/profile.scss';

class ProfileBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    componentWillReceiveProps() {
        this.setState({
            isOpen: false,
        });
    }

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    getIsOpenedToggleClass() {
        return this.state.isOpen ? ' menu-sidebar-toggler--opened' : '';
    }

    render() {
        const { translate } = this.props,
            isOpenedToggleClass = this.getIsOpenedToggleClass();

        return (
            <ContainerWrapper className="container--min-height-500">
                <div className="row">
                    <div className="col-12 menu-sidebar-toggler-wrapper">
                        <NavbarToggler className={"menu-sidebar-toggler" + isOpenedToggleClass}
                            onClick={this.toggleNavbar} />
                    </div>

                    <Collapse className="col-lg-3 mb-4" isOpen={this.state.isOpen}>
                        <div>
                            <ul className="menu-sidebar">
                                <li className="menu-sidebar__header">
                                    { translate('profile_base.profile') }
                                </li>
                                <li className="menu-sidebar__item">
                                    <Link to="/dashboard/profile/general"
                                        className="menu-sidebar__link"
                                        activeClassName="menu-sidebar__link--active"
                                    >
                                        { translate('profile_base.personal_info') }
                                    </Link>
                                </li>
                                <li className="menu-sidebar__item">
                                    <Link to="/dashboard/profile/avatar"
                                        className="menu-sidebar__link"
                                        activeClassName="menu-sidebar__link--active"
                                    >
                                        { translate('profile_base.avatar') }
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className="menu-sidebar">
                                <li className="menu-sidebar__header">
                                    { translate('profile_base.reviews.header') }
                                </li>
                                <li className="menu-sidebar__item">
                                    <Link to="/dashboard/profile/reviews/received"
                                        className="menu-sidebar__link"
                                        activeClassName="menu-sidebar__link--active"
                                    >
                                        { translate('profile_base.reviews.received') }
                                    </Link>
                                </li>
                                <li className="menu-sidebar__item">
                                    <Link to="/dashboard/profile/reviews/given"
                                        className="menu-sidebar__link"
                                        activeClassName="menu-sidebar__link--active"
                                    >
                                        { translate('profile_base.reviews.given') }
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className="menu-sidebar">
                                <li className="menu-sidebar__header">
                                    { translate('profile_base.account') }
                                </li>
                                <li className="menu-sidebar__item">
                                    <Link to="/dashboard/profile/password"
                                        className="menu-sidebar__link"
                                        activeClassName="menu-sidebar__link--active"
                                    >
                                        { translate('profile_base.change_password') }
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Collapse>

                    <div className="col-lg-9">
                        {this.props.children}
                    </div>
                </div>
            </ContainerWrapper>
        );
    }
}

export default localize(ProfileBase, 'locale');
