import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import DriverProfileContainer from '../components/Driver/DriverProfileContainer';

import LangService from 'app/services/LangService';
import * as lang from '../lang/DriverPublicProfile.locale.json';

class DriverPublicProfile extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper>
                <DriverProfileContainer id={ this.props.params.id }/>
            </ContainerWrapper>
        );
    }
}

export default localize(DriverPublicProfile, 'locale');
