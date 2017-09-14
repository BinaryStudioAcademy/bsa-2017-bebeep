import React from 'react';
import * as lang from '../lang/Messaging.locale.json';
import LangService from 'app/services/LangService';
import {localize} from 'react-localize-redux';
import MessagingContainer from '../components/MessagingPage/MessagingContainer';
import ContainerWrapper from 'app/layouts/ContainerWrapper';

class MessagingPage extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <ContainerWrapper className="pt-3 pb-0">
                <MessagingContainer user_id = { this.props.params.id }/>
            </ContainerWrapper>
        );
    }
}

export default localize(MessagingPage, 'locale');
