import React from 'react';
import * as lang from '../lang/Notifications.locale.json';
import LangService from 'app/services/LangService';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import NotificationsList from '../components/NotificationsList';
import ContainerWrapper from 'app/layouts/ContainerWrapper';

class Notifications extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <ContainerWrapper className="container--min-height-400">
                <PageHeader header={translate('notifications.header')} />
                <NotificationsList />
            </ContainerWrapper>
        );
    }
}

export default localize(Notifications, 'locale');
