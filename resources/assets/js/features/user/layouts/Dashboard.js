import React from 'react';

import LangService from '../../../app/services/LangService';
import * as lang from '../lang/Dashboard.locale.json';
import {localize} from 'react-localize-redux';

import PageHeader from 'app/components/PageHeader';
import { getAuthUser } from 'app/services/AuthService';

class Dashboard extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const authUser = getAuthUser();
        const {translate} = this.props;

        return (
            <section className="page-section">
                <PageHeader header={ translate('dashboard.header') } />
                <p className="text-center">{translate('dashboard.hello', {username: authUser.username})}</p>
            </section>
        )
    }
}

export default localize(Dashboard, 'locale');
