import React from 'react';

import PageHeader from 'app/components/PageHeader';
import DriverProfileContainer from '../components/DriverProfileContainer';
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
            <div>
                <PageHeader header={translate('driver_public_profile.header')}/>
                <DriverProfileContainer id={ this.props.params.id }/>
            </div>
        );
    }
}, 'locale');
