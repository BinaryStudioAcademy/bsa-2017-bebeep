import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PassengerProfileContainer from '../components/Passenger/PassengerProfileContainer';

import LangService from 'app/services/LangService';
import * as lang from '../lang/DriverPublicProfile.locale.json';

class PassengerPublicProfile extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper>
                <PassengerProfileContainer id={ this.props.params.id } />
            </ContainerWrapper>
        );
    }
}

export default localize(PassengerPublicProfile, 'locale');
