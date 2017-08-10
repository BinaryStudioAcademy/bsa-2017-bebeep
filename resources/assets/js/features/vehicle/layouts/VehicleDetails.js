import React, { Component } from 'react';

import PageHeader from 'app/components/PageHeader';
import VehicleProfile from '../components/VehicleProfile';

import '../styles/vehicle.scss';

class VehicleDetails extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Vehicle Profile' } />
                <VehicleProfile id={ this.props.params.id } />
            </div>
        )
    }
}

export default VehicleDetails;
