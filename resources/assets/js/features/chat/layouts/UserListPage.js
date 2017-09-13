import React from 'react';
import * as lang from '../lang/UserList.locale.json';
import LangService from 'app/services/LangService';
import {localize} from 'react-localize-redux';
import UserListContainer from '../components/UserListContainer';
import ContainerWrapper from 'app/layouts/ContainerWrapper';

class MessagingPage extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <ContainerWrapper>
                <UserListContainer>

                </UserListContainer>
            </ContainerWrapper>
        );
    }
}

export default localize(MessagingPage, 'locale');