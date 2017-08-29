import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import LangService from '../../../app/services/LangService';
import * as lang from '../lang/Dashboard.locale.json';

import PageHeader from 'app/components/PageHeader';

class Dashboard extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        console.log(this.props);
        const { user, translate } = this.props;

        return (
            <section className="page-section">
                <PageHeader header={ translate('dashboard.header') } />
                { user.avatar }
                <p className="text-center">{translate('dashboard.hello', {username: user.full_name})}</p>
            </section>
        )
    }
}

const DashboardConnected = connect(
    (state) => ({
        user: state.user.data,
    }),
    null
)(Dashboard);

export default localize(DashboardConnected, 'locale');
