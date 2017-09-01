import React from 'react';
import { localize } from 'react-localize-redux';

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
            <PassengerProfileContainer id={ params.id }/>
        );
    }
}

export default localize(PassengerPublicProfile, 'locale');
