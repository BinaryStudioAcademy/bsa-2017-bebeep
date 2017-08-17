import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';
import VehicleEditForm from '../components/VehicleEditForm';

import '../styles/vehicle.scss';
import '../styles/react-select.scss';

class VehicleUpdate extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Edit Vehicle' } />
                <VehicleEditForm id={ this.props.params.id } />
            </div>
        )
    }
}

export default VehicleUpdate;