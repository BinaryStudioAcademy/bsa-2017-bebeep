import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import CreateVehicleForm from '../components/Containers/CreateVehicle';

import LangService from 'app/services/LangService';
import * as lang from '../lang/CreateVehicle.locale.json';

import '../styles/vehicle.scss';
import '../styles/react-select.scss';

class CreateVehicle extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate } = this.props;

        return (
            <ContainerWrapper>
                <PageHeader header={ translate('vehicle.create_vehicle_header') }/>
                <CreateVehicleForm/>
            </ContainerWrapper>
        );
    }
}

export default localize(CreateVehicle, 'locale');
