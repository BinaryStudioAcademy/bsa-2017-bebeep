import React from 'react';
import PageHeader from 'app/components/PageHeader';
import LangService from 'app/services/LangService';
import * as lang from '../lang/Vehicles.locale.json';
import {localize} from 'react-localize-redux';
import '../styles/vehicle.scss';

class Vehicles extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={ translate('vehicles.vehicles_list_header') } />
                {/*<VehiclesList />*/}
            </div>
        )
    }
}

export default localize(Vehicles, 'locale');
