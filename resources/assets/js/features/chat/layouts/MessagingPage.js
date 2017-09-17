import React from 'react';
import * as lang from '../lang/Messaging.locale.json';
import LangService from 'app/services/LangService';
import {localize} from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import MessagingContainer from '../components/MessagingPage/MessagingContainer';

class MessagingPage extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <ContainerWrapper>
                <div className="row">
                    <MessagingContainer userId = { this.props.params.id }/>
                </div>
            </ContainerWrapper>
        );
    }
}

export default localize(MessagingPage, 'locale');
