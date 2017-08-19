import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import Logout from '../../components/Login/Logout';

import LangService from '../../../../app/services/LangService';
import * as lang from '../../lang/Login/Logout.locale.json';
import {localize} from 'react-localize-redux';
import '../../styles/user.scss';

class LogoutLayout extends Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('header_logout') } />
                <Logout />
            </div>
        )
    }
}

export default localize(LogoutLayout, 'locale');
