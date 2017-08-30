import React from 'react';
import PassengerProfileContainer from '../components/Passenger/PassengerProfileContainer';
import LangService from 'app/services/LangService';
import * as lang from '../lang/DriverPublicProfile.locale.json';
import {localize} from 'react-localize-redux';

export default localize(class PassengerPublicProfile extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <PassengerProfileContainer id={ this.props.params.id }/>
        );
    }
}, 'locale');
