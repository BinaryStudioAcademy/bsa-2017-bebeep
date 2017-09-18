import React from 'react';
import * as lang from '../lang/UserList.locale.json';
import LangService from 'app/services/LangService';
import {localize} from 'react-localize-redux';
import UserListContainer from '../components/UserList/UserListContainer';
import PageHeader from 'app/components/PageHeader';
import ContainerWrapper from 'app/layouts/ContainerWrapper';
import SearchUsers from '../components/SearchUsers';

class UserListPage extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <ContainerWrapper className="container--min-height-400">
                <PageHeader header={translate('chat.user_list.header')} />
                <SearchUsers />
                <UserListContainer />
            </ContainerWrapper>
        );
    }
}

export default localize(UserListPage, 'locale');
