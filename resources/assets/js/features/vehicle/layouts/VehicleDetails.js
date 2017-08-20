import React from 'react';

import PageHeader from 'app/components/PageHeader';
import VehicleProfile from '../components/VehicleProfile';

import LangService from 'app/services/LangService';
import * as lang from '../lang/VehicleDetails.locale.json';
import {localize} from 'react-localize-redux';
import '../styles/vehicle.scss';

class VehicleDetails extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('vehicle_profile_header') } />
                <VehicleProfile id={ this.props.params.id } />
            </div>
        )
    }
}

export default localize(VehicleDetails, 'locale');
