import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PassengerProfileContainer from '../components/Passenger/PassengerProfileContainer';

import LangService from 'app/services/LangService';
import * as lang from '../lang/PublicProfile.locale.json';

class PassengerPublicProfile extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate, params } = this.props;

        return (
            <ContainerWrapper>
                <PassengerProfileContainer id={ params.id } />
            </ContainerWrapper>
        );
    }
}

export default localize(PassengerPublicProfile, 'locale');
