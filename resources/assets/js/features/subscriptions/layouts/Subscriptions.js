import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../lang/Subscriptions.locale.json';
import {localize} from 'react-localize-redux';
import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import SubscriptionList from '../components/SubscriptionList';

class Subscriptions extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <ContainerWrapper>
                <PageHeader header={translate('subscriptions.header')}/>
                <SubscriptionList />
            </ContainerWrapper>
        );
    }
}

export default localize(Subscriptions, 'locale');
