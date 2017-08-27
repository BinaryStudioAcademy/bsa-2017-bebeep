import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import '../styles/vehicle.scss';
import '../styles/react-select.scss';
import EditVehicleForm from '../components/Containers/EditVehicle';
import LangService from 'app/services/LangService';
import * as lang from '../lang/EditVehicle.locale.json';
import { localize } from 'react-localize-redux';

class EditVehicle extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ translate('vehicle.edit_vehicle_header') }/>
                <EditVehicleForm id={ this.props.params.id }/>
            </div>
        );
    }
}

export default localize(EditVehicle, 'locale');