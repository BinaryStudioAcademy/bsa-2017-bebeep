import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import Logout from 'features/user/components/Login/Logout';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Login/Logout.locale.json';

import 'features/user/styles/user.scss';

class LogoutLayout extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper className="container--min-height-350">
                <PageHeader header={ translate('logout.header_logout') } />
                <Logout />
            </ContainerWrapper>
        );
    }
}

export default localize(LogoutLayout, 'locale');
