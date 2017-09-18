import React from 'react';
import { localize } from 'react-localize-redux';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';
import EditVehicleForm from '../components/Containers/EditVehicle';

import LangService from 'app/services/LangService';
import * as lang from '../lang/EditVehicle.locale.json';

import '../styles/vehicle.scss';
import '../styles/react-select.scss';

class EditVehicle extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <ContainerWrapper>
                <PageHeader header={ translate('vehicle.edit_vehicle_header') }/>
                <EditVehicleForm id={ this.props.params.id } translate={ translate }/>
            </ContainerWrapper>
        );
    }
}

export default localize(EditVehicle, 'locale');
