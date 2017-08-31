import React from 'react';
import DriverProfileContainer from '../components/Driver/DriverProfileContainer';
import LangService from 'app/services/LangService';
import * as lang from '../lang/DriverPublicProfile.locale.json';
import {localize} from 'react-localize-redux';

export default localize(class DriverPublicProfile extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <DriverProfileContainer id={ this.props.params.id }/>
        );
    }
}, 'locale');
