import React from 'react';

import PageHeader from 'app/components/PageHeader';
import Logout from 'features/user/components/Login/Logout';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Login/Logout.locale.json';
import {localize} from 'react-localize-redux';
import 'features/user/styles/user.scss';

class LogoutLayout extends React.Component {

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
