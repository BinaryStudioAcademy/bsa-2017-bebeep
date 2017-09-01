import React from 'react';
import { localize } from 'react-localize-redux';

import DriverProfileContainer from '../components/Driver/DriverProfileContainer';

import LangService from 'app/services/LangService';
import * as lang from '../lang/PublicProfile.locale.json';

class DriverPublicProfile extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate, params } = this.props;

        return (
            <DriverProfileContainer id={ params.id }/>
        );
    }
}

export default localize(DriverPublicProfile, 'locale');
